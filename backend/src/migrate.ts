// migrate.ts
import mongoose from "mongoose";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { Blog } from "./models/Blog";
import { Company } from "./models/Company";
import { Inquiry } from "./models/Inquiry";

const OLD_URI = "mongodb+srv://gouravdon518_db_user:kgmjnyMtZCGkV1xc@cluster0.ca8hvop.mongodb.net/sun_elastomer?appName=Cluster0";
const NEW_URI = "mongodb+srv://itjaikvik_db_user:2p6TuiMVgzhahKZs@cluster0.zdfjmne.mongodb.net/sun_elastomer?appName=Cluster0";

async function run() {
  console.log("=== STARTING MONGODB DATABASE MIGRATION ===");

  // 1. Connect to the OLD cluster
  console.log("Connecting to the OLD cluster...");
  await mongoose.connect(OLD_URI);
  console.log("Connected to OLD cluster successfully.");

  // 2. Read all data lean
  console.log("Reading data from OLD database collections...");
  const products = await Product.find({}).lean();
  const categories = await Category.find({}).lean();
  const blogs = await Blog.find({}).lean();
  const companies = await Company.find({}).lean();
  const inquiries = await Inquiry.find({}).lean();

  console.log(`Retrieved:
  - ${products.length} Products
  - ${categories.length} Categories
  - ${blogs.length} Blogs
  - ${companies.length} Company profile metadata
  - ${inquiries.length} B2B Inquiries`);

  // Disconnect from old
  await mongoose.disconnect();
  console.log("Disconnected from OLD cluster.");

  // 3. Connect to the NEW cluster
  console.log("Connecting to the NEW cluster...");
  await mongoose.connect(NEW_URI);
  console.log("Connected to NEW cluster successfully.");

  // 4. Clear the new cluster collections
  console.log("Clearing existing collections in the NEW database...");
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Blog.deleteMany({});
  await Company.deleteMany({});
  await Inquiry.deleteMany({});

  // 5. Insert data to the new cluster
  console.log("Inserting data into the NEW database...");
  if (products.length > 0) await Product.insertMany(products);
  if (categories.length > 0) await Category.insertMany(categories);
  if (blogs.length > 0) await Blog.insertMany(blogs);
  if (companies.length > 0) await Company.insertMany(companies);
  if (inquiries.length > 0) await Inquiry.insertMany(inquiries);

  console.log("=== MIGRATION COMPLETED SUCCESSFULLY ===");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Migration failed with error:", err);
  process.exit(1);
});
