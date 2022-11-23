import moment from "moment";

const names = ["Child 1", "Child 2", "Child 3", "Child 4", "Child 5"];

export const prices = [
  {
    1: 100,
  },
  {
    2: 200,
  },
  {
    3: 300,
  },
  {
    4: 400,
  },
  {
    5: 500,
  },
  {
    6: 600,
  },
  {
    7: 700,
  },
  {
    8: 800,
  },
  {
    9: 900,
  },
];

export const images = [
  {
    1: "/assets/image1.png",
  },
  {
    2: "/assets/image2.png",
  },
  {
    3: "/assets/image3.png",
  },
  {
    4: "/assets/image4.png",
  },
  {
    5: "/assets/image5.png",
  },
  {
    6: "/assets/image6.png",
  },
  {
    7: "/assets/image7.png",
  },
  {
    8: "/assets/image8.png",
  },
  {
    9: "/assets/image9.png",
  },
];

export const unique = (array) => {
  return Array.from(new Set(array));
};

export const getData = (data) => {
  const sumArray = [];
  const newArray = [];
  const imageArray = [];
  let productArray = [];
  const numberArray = [];
  let numberSum = 0;

  for (var i = 0; i < data?.length; i++) {
    data[i].name = names[i];
  }
  for (var j = 0; j < data?.length; j++) {
    productArray = data[j]?.products;
    const res = Array.from(
      productArray?.reduce(
        (m, { total, quantity }) =>
          m.set(total, (m.get(total) || 0) + quantity),
        new Map()
      ),
      ([total, quantity]) => ({ total, quantity })
    );
    sumArray.push(res[0]?.quantity);
  }
  for (var k = 0; k < sumArray?.length; k++) {
    if (sumArray[k] !== undefined) {
      data[k].total_items = sumArray[k];
    } else data[k].total_items = 0;
  }
  for (var l = 0; l < data?.length; l++) {
    productArray = data[l]?.products;
    for (var m = 0; m < productArray.length; m++) {
      for (var n = 0; n < Object.keys(prices).length; n++) {
        if (productArray[m].productId === Number(Object.keys(prices[n])[0])) {
          const newPrice = prices;
          const obtainedIndex = Number(Object.keys(prices[n])[0]);
          productArray[m].amount = newPrice[n][obtainedIndex];
          newArray.push(productArray);
        }
      }
      for (var q = 0; q < Object.keys(images).length; q++) {
        if (productArray[m].productId === Number(Object.keys(images[q])[0])) {
          const newImage = images;
          const obtainedImagesIndex = Number(Object.keys(images[q])[0]);
          productArray[m].images = newImage[q][obtainedImagesIndex];
          imageArray.push(productArray);
        }
      }
    }
    const amountArray = unique(newArray);
    data[l].products = amountArray[l];
    const pictureArray = unique(imageArray);
    data[l].products = pictureArray[l];
  }
  for (var o = 0; o < data?.length; o++) {
    for (var p = 0; p < data[o].products?.length; p++) {
      if (data[o]?.products?.length) {
        data[o].total_amount = 0;
      }
      numberSum += data[o].products[p].quantity * data[o].products[p].amount;
    }
    numberArray.push(numberSum);
    numberSum = 0;
    data[o].total_amount = numberArray[o];
  }
  return data;
};

export const formatDate = (date) => {
  let dates = new Date(date);
  let newdate = moment(dates);
  return newdate.format("MMM DD, YYYY hh:mm:ss A");
};

export const getGrouppedArray = (data) => {
  const productArray = [];

  for (var i = 0; i < data?.length; i++) {
    for (var j = 0; j < data[i]?.products?.length; j++) {
      productArray.push(data[i]?.products[j]);
    }
  }
  return productArray;
};

export const getEachProductCount = (data) => {
  const eachCounts = Object.values(
    data?.reduce((c, { productId }) => {
      c[productId] = c[productId] || { key: productId, count: 0 };
      c[productId].count++;
      return c;
    }, {})
  );
  return eachCounts;
};

export const getGroupedQuantities = (data) => {
  const keys = ["quantity"],
    groupedQuantities = Object.values(
      data?.reduce((result, object) => {
        result[object.productId] = result[object.productId] || {
          Id: object.productId,
        };
        keys.forEach(
          (key) =>
            (result[object.productId][key] =
              (result[object.productId][key] || 0) + object[key])
        );
        return result;
      }, Object.create(null))
    );
  return groupedQuantities;
};
