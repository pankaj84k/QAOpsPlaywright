const{ test, expect } = require('@playwright/test');
const ExcelJs = require("exceljs");

async function WriteExcelTest(searchText, replaceText, change, filePath)
{ 


const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath);

const worksheet = workbook.getWorksheet("Sheet1");
const output = await readExcel(worksheet, searchText, change);

const cell =  worksheet.getCell(output.row, output.column + change.colChange);
cell.value = replaceText;
await workbook.xlsx.writeFile(filePath);

}


async  function readExcel(worksheet, searchText)
{

  let output = {row:-1, column:-1}
  worksheet.eachRow((row, rowNumber) => {
  row.eachCell((cell, colNumber) => {

    //console.log(cell.value);
    if (cell.value == searchText)
    {
      console.log(rowNumber);
      console.log(colNumber);
      output.row = rowNumber;
      output.column = colNumber;
    }

  })
})

return output;
}



//Update mango price to 350
//WriteExcelTest("Mango", 350, {rowChange: 0, colChange: 2}, "C:/Users/HP/Downloads/excelTest1.xlsx");

test('Upload Download excel validation', async ({page})=>{


    const textSearch = 'Mango';
    const updatValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    page.getByRole('button', {name: 'Download'} ).click();
    await downloadPromise;
    WriteExcelTest(textSearch, 350, {rowChange: 0, colChange: 2}, "C:/Users/HP/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/HP/Downloads/download.xlsx");
    const textlocator = await page.getByText(textSearch);
    console.log(textlocator);
    const desiredRow = await page.getByRole('row').filter({has: textlocator});
    
    console.log(desiredRow);
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatValue);

})





