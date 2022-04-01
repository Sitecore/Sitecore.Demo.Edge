# Sitecore Discover

The categories and products we maintain in Sitecore Discover are managed in Excel spreadsheets stored on Box.

- Categories: `category-feed_working.xslx`
- Products: `product-feed_working.xslx`

When editing those files, please use Excel Online for us to collaborate in real-time and avoid merge conflicts.

## Adding New Products

When adding new products, please:

- Copy another product formulas in your new products (product_group, sku, and other columns).
- Do not create separate products for variants. Use the variants feature and the same product_group.
- Capitalize all product name word first letters.
- Make sure all the mandatory (red) fields have a value and the product also has a brand, a price, a final price, etc.
- Ensure the generated product_group and SKU is not a duplicate of an existing product. Change the new product name as needed.
- If the product has variants:
  - Copy the product row and paste it below itself. Each row will be a different product variant.
  - The product_group should be the same for all of these product variants, but the SKUs should be unique. In order to make that happen you should add all variant specifications in the appropriate columns (color, size, etc.). If adding a new color please adjust the formula in the color code column to accommodate for the new color. The color column should contain the basic color name (e.g. red, orange, blue) and the color_display_name column can contain any specific color name you would like (e.g. Crimson, Terracotta, Sky Blue).
  - If the variant has a specific image, specify it in the sku_image_url column.

## Changing Products URL

Sitecore Discover feed processing will fail with a `Threshold product_family_orphans reached: 50%` error if more than 50% of the product URLs have changed since the last run.

When changing the products URL structure, it is required to let the Sitecore Discover support know the new URL structure in advance to avoid this feed processing error.

## Uploading Categories and Products

### Categories

1. From Box, download the `category-feed_working.xslx` file to your computer.
2. Open the local `category-feed_working.xslx` file in the real Excel software.
3. Click the "File" menu.
4. Choose "Save As".
5. For the file type, select "CSV UTF-8 (Comma delimited) (*.csv)".
6. Click the "Save" button.
7. Close Excel.
   1. Excel might ask you to save changes. Do it.
8. Rename the CSV file to `playsummit_category_feed.csv`.
9. Open the CSV file in a text editor.
10. Inspect the file and validate it looks good.

### Products

1. From Box, open the `product-feed_working.xslx` file in Excel Online.
2. In the "Working sheet"
   1. Clear all the column filters.
   2. Filter the "ready" column on "READY" value to only get ready to upload products.
   3. Copy the column headers and all the displayed products from the column "product_group" to the last column.
   4. Clear all the column filters again for the next person that will use the file.
3. Create a new sheet named "[Current date] - Ready".
4. In the new sheet:
   1. Right click the A1 cell.
   2. Choose the "Paste Values" option to have a static copy of the products to upload.
5. Close the Excel Online tab.
6. From Box, download the `product-feed_working.xslx` file to your computer.
7. Open the local `product-feed_working.xslx` file in the real Excel software.
8. Select the the new sheet for the products to be uploaded.
9. Click the "File" menu.
10. Choose "Save As".
11. For the file type, select "CSV UTF-8 (Comma delimited) (*.csv)".
12. Click the "Save" button.
13. A message will be displayed asking to click OK if we want to save only the active sheet.
14. Click the OK button.
15. Close Excel.
    1. Excel might ask you to save changes. Do it.
16. Rename the CSV file to `playsummit_product_feed.csv`.
17. Open the CSV file in a text editor.
18. Inspect the file and validate it looks good.

### Upload

If you only modified one of the CSV feed file and you want to use a previously generated CSV file for the other feed, you must ensure that the file modified date is different from the last upload that was done. To do that, open the file in a text editor and save it without any changes.

Using an SFTP client:

1. Connect to the Play Summit Sitecore Discover FTP server.
   1. URL and credentials available in Sitecore Discover > Developer Resources > API Hosts > Legacy SFTP DNS.
2. Upload all the CSV files to the `/upload` folder. Both category and product feed files need to have a newer modified date at every upload. Override the existing files.
