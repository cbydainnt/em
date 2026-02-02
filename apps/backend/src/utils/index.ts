export const roundTo = (val: number, step: number) => {
  return Math.round(val / step) * step;
};

export const roundToStr = (val: number, decimals: number) => {
  const frac = 10 ** -decimals;
  const newVal = roundTo(val, frac) + frac * 0.001 * Math.sign(val);
  if (newVal < frac && newVal > -frac) {
    return '0';
  }
  const valStr = `${newVal}`;
  const dot = valStr.indexOf('.');
  if (dot < 0 || valStr.includes('e')) {
    return valStr;
  }
  let subStr = valStr.substring(0, dot + 1 + 2);
  while (subStr.endsWith('0')) {
    subStr = subStr.substring(0, subStr.length - 1);
  }
  if (subStr.endsWith('.')) {
    subStr = subStr.substring(0, subStr.length - 1);
  }
  return subStr;
};

export const describeAspectRatio = (width: number, height: number) => {
  const wh = width / height;
  const hw = height / width;
  if (roundTo(wh, 0.01) == 1) {
    return '1:1';
  } else if (roundTo(wh, 0.01) % 1 == 0) {
    return `${Math.round(wh)}:1`;
  } else if (roundTo(hw, 0.01) % 1 == 0) {
    return `1:${Math.round(hw)}`;
  }
  for (let i = 2; i < 50; i++) {
    if (roundTo(wh * i, 0.01) % 1 == 0) {
      return `${Math.round(wh * i)}:${i}`;
    }
    if (roundTo(hw * i, 0.01) % 1 == 0) {
      return `${i}:${Math.round(hw * i)}`;
    }
  }
  if (wh > 1) {
    return `${roundToStr(wh, 2)}:1`;
  }
  return `1:${roundToStr(hw, 2)}`;
};

export const convertDate = (date: Date) => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();

  const mmChars = mm.split('');
  const ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0]);
};

export const savetoThumb = (outputFilePath, data, x, y) => {
  const sharp = require('sharp');
  const fs = require('fs');
  sharp(data)
    .resize(x, y)
    .toBuffer()
    .then(async (resizedBuffer) => {
      // Lưu ảnh đã resize vào file
      await fs.writeFile(outputFilePath, resizedBuffer, (err) => {
        if (err) {
          console.error('Error writing output file:', err);
        } else {
          console.log('Image resized successfully and saved to', outputFilePath);
        }
      });
    })
    .catch((err) => {
      console.error('Error resizing image:', err);
    });
};
export const convertToThumb = (data, x, y) => {
  const sharp = require('sharp');
  return sharp(data)
    .resize(x, y)
    .toBuffer()
    .then((resizedBuffer) => {
      // Chuyển buffer sang base64 string
      const base64 = resizedBuffer.toString('base64');
      // Thêm prefix định dạng ảnh nếu cần (vd: 'data:image/jpeg;base64,')
      return `data:image/jpeg;base64,${base64}`;
    })
    .catch((err) => {
      console.error('Error resizing image:', err);
      throw err;
    });
};

export function readJsonProperty(jsonString, propertyName) {
  try {
    // const jsonObject = JSON.parse(jsonString);
    const jsonObject = jsonString;

    const subpropertyName = propertyName.split('.');

    var returnValue = jsonObject;
    subpropertyName.forEach((element) => {
      // Kiểm tra xem thuộc tính có tồn tại trong đối tượng không
      if (returnValue.hasOwnProperty(element)) {
        returnValue = returnValue[element];
        // console.log(returnValue);
      } else {
        throw new Error(`-'${element}' or ${propertyName}-`);
      }
    });
    return returnValue;
  } catch (error: any) {
    return 'Error: ' + error.message;
  }
}


