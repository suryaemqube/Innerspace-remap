const fs = require("fs");
const path = require("path");
const queries = require("./queries");

const fetchPromise = import("node-fetch");

const { ApolloClient, gql, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: "https://app.innerspacedxb.com/graphql",
  cache: new InMemoryCache(),
});

const folderPath = path.join(__dirname + "/src/", "pageData");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const filePath = path.join(folderPath, "graphqlData.json");
const publicDirectoryPath = __dirname + "/public";

const imageFolderPath = path.join(__dirname + "/public/", "images");
if (!fs.existsSync(imageFolderPath)) {
  fs.mkdirSync(imageFolderPath);
}
async function fetchData(filePath) {
  try {
    for (const queryObj of queries) {
      const { data } = await client.query({
        query: queryObj.query,
      });

      // console.log(queryObj.location, data);

      const { modifedData, imageUrls } = extractImageUrls(data);
      console.log(modifedData);

      for (const imageUrl of imageUrls) {
        await downloadImage(imageUrl, imageFolderPath);
      }

      const filePath = path.join(folderPath, queryObj.location);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }

      const newfilePath = path.join(filePath, "graphqlData.json");

      fs.writeFileSync(newfilePath, JSON.stringify(modifedData));
      // console.log(
      //   `Data for ${queryObj.location} fetched and saved successfully.`, newfilePath
      // );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function extractImageUrls(data) {
  const mutableData = deepClone(data);
  const imageUrls = [];

  function findImageUrls(obj) {
    for (const key in obj) {
      if (obj[key] !== null && typeof obj[key] === "object") {
        findImageUrls(obj[key]);
      } else if (key === "mediaItemUrl") {
        imageUrls.push(obj[key]);

        const imageFileName = obj[key].split("/").pop();
        const imagePath = path.join(imageFolderPath, imageFileName);
        const relativeImagePath = path.relative(publicDirectoryPath, imagePath);
        obj.localPath = `\\` + relativeImagePath;
      }
    }
  }

  findImageUrls(mutableData);
  return { modifedData: mutableData, imageUrls };
}

async function downloadImage(imageUrl, imageFolderPath) {
  try {
    const imageFileName = imageUrl.split("/").pop();
    const imagePath = path.join(imageFolderPath, imageFileName);
    const fetch = await fetchPromise;
    const imageResponse = await fetch.default(imageUrl);

    const contentType = imageResponse.headers.get("content-type");
    if (contentType && contentType.startsWith("image")) {
      const imageStream = fs.createWriteStream(imagePath);
      imageResponse.body.pipe(imageStream);
      await new Promise((resolve, reject) => {
        imageStream.on("finish", resolve);
        imageStream.on("error", reject);
      });

      // console.log(`Image downloaded: ${imageFileName}`);
    } else {
      console.error("Response is not an image");
    }
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
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

fetchData(filePath);
