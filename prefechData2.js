const fs = require('fs');
const path = require('path');

// const im = require('immer')

const fetchPromise = import('node-fetch');

const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');

const client = new ApolloClient({
  uri: 'https://app.innerspacedxb.com/graphql',
  cache: new InMemoryCache(),
});



const folderPath = path.join(__dirname + "/src/", 'pageData');
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const filePath = path.join(folderPath, 'graphqlData.json');
async function fetchData() {
  try {
    // Wait for the fetch module to be imported
    const fetch = await fetchPromise;

    const { data } = await client.query({
      query: gql`
        query{
          menuItems(first: 20, where: {location: PRIMARY}) {
            edges {
              node {
                id
                label
                uri
                parentId
                path
                cssClasses
              }
            }
          }
          page(id: "7", idType: DATABASE_ID) {
            homePageContent {
              homePortfolioImage {
                altText
                mediaItemUrl
              }
            }
          }
        } 
      `,
    });

    // fs.access(filePath, fs.constants.F_OK, (err) => {
    //   if (err) {
    //     console.error(`Directory ${filePath} does not exist or is not accessible.`);
    //     return;
    //   }

    //   // Check the write permissions of the directory
    //   fs.access(filePath, fs.constants.W_OK, (err) => {
    //     if (err) {
    //       console.error(`Directory ${filePath} does not have write permissions.`);
    //     } else {
    //       console.log(`Directory ${filePath} has write permissions.`);
    //     }
    //   });
    // });
    const publicDirectoryPath = __dirname +"/public";
    const imageFolderPath = path.join(__dirname +"/public/", "images");


    if (!fs.existsSync(imageFolderPath)) {
      fs.mkdirSync(imageFolderPath);
    }
    const imageUrl = data.page.homePageContent.homePortfolioImage.mediaItemUrl;
    if (imageUrl) {
      const imageFileName = imageUrl.split('/').pop();
      const imagePath = path.join(imageFolderPath, imageFileName);

      const imageResponse = await fetch.default(imageUrl);

      const contentType = imageResponse.headers.get('content-type');
      if (contentType && contentType.startsWith('image')) {
        // If response is an image, create a writable stream and pipe the response
        const imageStream = fs.createWriteStream(imagePath);
        imageResponse.body.pipe(imageStream);

        // Wait for the stream to finish writing
        await new Promise((resolve, reject) => {
          imageStream.on('finish', resolve);
          imageStream.on('error', reject);
        });

        // const newData = im.produce(data, draft => {
        //   if (draft.page.homePageContent.homePortfolioImage) {
        //     const image = draft.page.homePageContent.homePortfolioImage;
        //     image.localPath = imagePath;
        //   }
        // });

        function deepClone(obj) {
          if (obj === null || typeof obj !== 'object') {
            return obj;
          }
          const clone = Array.isArray(obj) ? [] : {};
          for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
              clone[key] = deepClone(obj[key]);
            }
          }
          return clone;
        }

        function updateDataImmutable(data, updater) {
          const newData = deepClone(data);
          updater(newData);
          return newData;
        }

        const newData = updateDataImmutable(data, newData => {
          if (newData.page.homePageContent.homePortfolioImage) {
            const image = newData.page.homePageContent.homePortfolioImage;
            const relativeImagePath = path.relative(publicDirectoryPath, imagePath);
            console.log("Relative: ",relativeImagePath)
            image.localPath = "/"+relativeImagePath;
          }
        });

        // Store fetched data in a JSON file
        fs.writeFileSync(filePath, JSON.stringify(newData));
        console.log('Data fetched and saved successfully.');
      } else {
        console.error('Response is not an image');
      }
    }


  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();



















