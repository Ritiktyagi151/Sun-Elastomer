import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { promises as fs } from "fs";
import { connectToDatabase } from "./db";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { Blog } from "./models/Blog";
import { Inquiry } from "./models/Inquiry";
import { Company } from "./models/Company";
import { AdminUser } from "./models/AdminUser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static uploads folder
const uploadsDir = path.join(process.cwd(), "uploads");
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);
app.use("/uploads", express.static(uploadsDir));

// Serve static banners folder
const bannersDir = path.join(process.cwd(), "banners");
fs.mkdir(path.join(bannersDir, "desktop"), { recursive: true }).catch(console.error);
fs.mkdir(path.join(bannersDir, "mobile"), { recursive: true }).catch(console.error);
app.use("/banners", express.static(bannersDir));

// ================= DB CONNECTION MIDDLEWARE =================
let adminSeeded = false;
const dbConnect = async (req: Request, res: Response, next: Function) => {
  try {
    await connectToDatabase();
    if (!adminSeeded) {
      const count = await AdminUser.countDocuments({});
      if (count === 0) {
        await AdminUser.create({
          username: "admin",
          password: "sunpharma2026",
          name: "Administrator"
        });
        console.log("Default admin account seeded successfully.");
      }
      adminSeeded = true;
    }
    next();
  } catch (error: any) {
    console.error("Database connection failure:", error);
    res.status(500).json({ error: "Database connection failed: " + error.message });
  }
};

app.use(dbConnect);

// ================= PRODUCTS ROUTES =================
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).sort({ brand: 1 });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const existing = await Product.findOne({ slug: data.slug });
    if (existing) {
      return res.status(400).json({ error: "Product slug already exists" });
    }
    const newProduct = await Product.create(data);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/products/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const data = req.body;
    const updated = await Product.findOneAndUpdate({ slug }, data, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/products/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const deleted = await Product.findOneAndDelete({ slug });
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= CATEGORIES ROUTES =================
app.get("/api/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({}).sort({ title: 1 });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/categories", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const existing = await Category.findOne({ category: data.category });
    if (existing) {
      return res.status(400).json({ error: "Category key already exists" });
    }
    const newCategory = await Category.create(data);
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/categories/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ category: slug });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/categories/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const data = req.body;
    const updated = await Category.findOneAndUpdate({ category: slug }, data, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/categories/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const deleted = await Category.findOneAndDelete({ category: slug });
    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= BLOGS ROUTES =================
app.get("/api/blogs", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/blogs", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const existing = await Blog.findOne({ slug: data.slug });
    if (existing) {
      return res.status(400).json({ error: "Blog post slug already exists" });
    }
    const newBlog = await Blog.create(data);
    res.status(201).json(newBlog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/blogs/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/blogs/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const data = req.body;
    const updated = await Blog.findOneAndUpdate({ slug }, data, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/blogs/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const deleted = await Blog.findOneAndDelete({ slug });
    if (!deleted) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= INQUIRIES ROUTES =================
app.get("/api/inquiries", async (req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/inquiries", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newInquiry = await Inquiry.create(data);
    res.status(201).json(newInquiry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/inquiries/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await Inquiry.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/inquiries/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= COMPANY METADATA ROUTES =================
app.get("/api/company", async (req: Request, res: Response) => {
  try {
    let info = await Company.findOne({});
    if (!info) {
      return res.json({
        name: "Sun Elastomers Private Limited",
        shortName: "Sun Elastomers",
        gstin: "09AACCC9768N1ZS",
        registrationDate: "30/10/2018",
        registrationType: "Regular",
        constitution: "Private Limited Company",
        address: "Site-4, 62/2/2, Industrial Area Sahibabad, Ghaziabad, Uttar Pradesh - 201010",
        contactEmail: "info@sunelastomerspharma.com",
        contactPhone: "+91 99677 77537",
        footerDescription: "Trusted pharmaceutical product company offering quality tablets, capsules, injectables and antibiotic formulations for B2B healthcare supply.",
        linkedinUrl: "https://www.linkedin.com/",
        twitterUrl: "https://twitter.com/",
        whatsappUrl: "",
        floatingWhatsapp: "",
        floatingPhone: "",
        floatingEmail: "",
      });
    }
    
    // Ensure all optional fields have a default string returned if missing from DB
    const infoObj = info.toObject();
    res.json({
      ...infoObj,
      footerDescription: infoObj.footerDescription || "",
      linkedinUrl: infoObj.linkedinUrl || "",
      twitterUrl: infoObj.twitterUrl || "",
      whatsappUrl: infoObj.whatsappUrl || "",
      floatingWhatsapp: infoObj.floatingWhatsapp || "",
      floatingPhone: infoObj.floatingPhone || "",
      floatingEmail: infoObj.floatingEmail || "",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/company", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let info = await Company.findOne({});
    if (!info) {
      info = await Company.create(data);
    } else {
      info = await Company.findByIdAndUpdate(info._id, data, { new: true });
    }
    res.json(info);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= DATABASE SEED ROUTE =================
const seedHandler = async (req: Request, res: Response) => {
  try {
    const backupDir = path.join(__dirname, "../backup");

    // 1. Read files
    const productsData = JSON.parse(await fs.readFile(path.join(backupDir, "products.json"), "utf-8"));
    const categoriesData = JSON.parse(await fs.readFile(path.join(backupDir, "categories.json"), "utf-8"));
    const blogsData = JSON.parse(await fs.readFile(path.join(backupDir, "blogs.json"), "utf-8"));
    const companyData = JSON.parse(await fs.readFile(path.join(backupDir, "company.json"), "utf-8"));

    // 2. Clear collections
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Blog.deleteMany({});
    await Company.deleteMany({});
    await Inquiry.deleteMany({});

    // 3. Seed collections
    await Product.insertMany(productsData);
    await Category.insertMany(categoriesData);
    await Blog.insertMany(blogsData);
    await Company.create(companyData);

    // Seed default inquiries
    const defaultInquiries = [
      {
        type: "Contact Form",
        name: "Aung Kyaw",
        company: "Myanmar Pharma Imports Ltd",
        email: "aung.kyaw@myanmarpharma.com",
        phone: "+95 9 1234 5678",
        country: "Myanmar",
        product: "SUNMOX-CV 625",
        message: "Requesting B2B quotation for 5,000 packs of SUNMOX-CV 625. Please provide pricing and shipping timeline details.",
        date: "Jun 28, 2026, 10:45 AM",
        status: "unread",
      },
      {
        type: "Product Page",
        name: "Dr. Sandeep Nair",
        company: "Apollo Distributors",
        email: "sandeep.nair@apollodist.com",
        phone: "+91 98765 43210",
        country: "India",
        product: "ELSEFPIME-1000mg",
        message: "Need Certificates of Analysis (COA) and stability dossiers for ELSEFPIME-1000mg for upcoming institutional hospital tender.",
        date: "Jun 27, 2026, 02:15 PM",
        status: "read",
      },
    ];
    await Inquiry.insertMany(defaultInquiries);

    res.json({
      success: true,
      message: "Database seeded successfully from backups!",
      seededCounts: {
        products: productsData.length,
        categories: categoriesData.length,
        blogs: blogsData.length,
        company: 1,
        inquiries: defaultInquiries.length,
      },
    });
  } catch (error: any) {
    console.error("Seeding failure:", error);
    res.status(500).json({ error: error.message });
  }
};

app.get("/api/seed", seedHandler);
app.post("/api/seed", seedHandler);

// ================= UPLOAD ROUTE =================
app.post("/api/upload", async (req: Request, res: Response) => {
  try {
    const { name, data } = req.body;
    if (!name || !data) {
      return res.status(400).json({ error: "Missing filename (name) or base64 data" });
    }
    const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const safeName = `${Date.now()}-${name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
    const targetUploadsDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(targetUploadsDir, { recursive: true });
    await fs.writeFile(path.join(targetUploadsDir, safeName), buffer);

    // Sync to frontend public directory if it exists (for local Next.js dev server accessibility)
    try {
      const frontendPublicUploads = path.join(process.cwd(), "../frontend/public/uploads");
      await fs.mkdir(frontendPublicUploads, { recursive: true });
      await fs.writeFile(path.join(frontendPublicUploads, safeName), buffer);
    } catch (err) {
      console.log("Local Next.js public sync skipped (non-local environment or write error)");
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL || `http://localhost:${PORT}`;
    res.status(201).json({
      url: `${apiBase}/uploads/${safeName}`,
      success: true
    });
  } catch (error: any) {
    console.error("Upload failure:", error);
    res.status(500).json({ error: error.message });
  }
});

// ================= DUAL BANNER UPLOAD ROUTE =================
app.post("/api/upload-banner", async (req: Request, res: Response) => {
  try {
    const { name, desktopData, mobileData, existingName } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }

    const isDesktopBase64 = desktopData && desktopData.startsWith("data:image/");
    const isMobileBase64 = mobileData && mobileData.startsWith("data:image/");

    if (!isDesktopBase64 && !isMobileBase64) {
      return res.status(400).json({ error: "At least one base64 image (desktopData or mobileData) is required" });
    }

    const rootBannersDir = path.join(process.cwd(), "banners");
    const desktopDir = path.join(rootBannersDir, "desktop");
    const mobileDir = path.join(rootBannersDir, "mobile");

    await fs.mkdir(desktopDir, { recursive: true });
    await fs.mkdir(mobileDir, { recursive: true });

    // Use the existingName when only one side is being updated, otherwise generate new
    const safeName = existingName || `${Date.now()}-${name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;

    // Only write the slots that have new base64 data
    if (isDesktopBase64) {
      const cleanDesktop = desktopData.replace(/^data:image\/\w+;base64,/, "");
      const desktopBuffer = Buffer.from(cleanDesktop, "base64");
      await fs.writeFile(path.join(desktopDir, safeName), desktopBuffer);
      try {
        const frontendDesktop = path.join(process.cwd(), "../frontend/public/banners/desktop");
        await fs.mkdir(frontendDesktop, { recursive: true });
        await fs.writeFile(path.join(frontendDesktop, safeName), desktopBuffer);
      } catch {}
    }

    if (isMobileBase64) {
      const cleanMobile = mobileData.replace(/^data:image\/\w+;base64,/, "");
      const mobileBuffer = Buffer.from(cleanMobile, "base64");
      await fs.writeFile(path.join(mobileDir, safeName), mobileBuffer);
      try {
        const frontendMobile = path.join(process.cwd(), "../frontend/public/banners/mobile");
        await fs.mkdir(frontendMobile, { recursive: true });
        await fs.writeFile(path.join(frontendMobile, safeName), mobileBuffer);
      } catch {}
    }

    res.status(201).json({
      url: `/banners/desktop/${safeName}`,
      success: true
    });
  } catch (error: any) {
    console.error("Banner upload failure:", error);
    res.status(500).json({ error: error.message });
  }
});

// ================= ADMIN ACCOUNTS ROUTES =================
app.post("/api/admin/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const user = await AdminUser.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        name: user.name
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/users", async (req: Request, res: Response) => {
  try {
    const users = await AdminUser.find({}, { password: 0 });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/admin/users", async (req: Request, res: Response) => {
  try {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({ error: "Username, password and name are required" });
    }
    const existing = await AdminUser.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const newUser = await AdminUser.create({ username, password, name });
    res.status(201).json({
      success: true,
      user: {
        username: newUser.username,
        name: newUser.name
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/admin/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, name } = req.body;
    
    if (username) {
      const existing = await AdminUser.findOne({ username, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const updateData: any = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (name) updateData.name = name;

    const updatedUser = await AdminUser.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      success: true,
      user: {
        username: updatedUser.username,
        name: updatedUser.name
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/admin/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const count = await AdminUser.countDocuments({});
    if (count <= 1) {
      return res.status(400).json({ error: "Cannot delete the last remaining admin account" });
    }

    const deleted = await AdminUser.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, message: "Admin account deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= BOOTSTRAP SERVER =================
app.listen(PORT, () => {
  console.log(`[Sun Elastomers Server] Running on http://localhost:${PORT}`);
});
