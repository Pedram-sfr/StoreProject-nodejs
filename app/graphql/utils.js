const { Kind } = require("graphql");
const { CourseModel } = require("../model/course");
const { ProductModel } = require("../model/products");
const { BlogModel } = require("../model/blogs");
const createHttpError = require("http-errors");

function parseObject(valueNode) {
  const value = Object.create(null);
  valueNode.fields.forEach((field) => {
    value[field.name.value] = parseValueNode(field.value);
  });
  return value;
}
function parseValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(valueNode.value);
    case Kind.OBJECT:
      return parseObject(valueNode.value);
    case Kind.LIST:
      return valueNode.values.map(parseValueNode);
    default:
      return null;
  }
}

function parseLiteral(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
      return valueNode.value.charAt(0) === "{"
        ? JSON.parse(valueNode.value)
        : valueNode.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(valueNode.value);
    case Kind.OBJECT:
        return parseObject(valueNode)
    default:
      return null;
  }
}

function toObject(value) {
  if (typeof value === "object") return value;
  if (typeof value === "string" && value.charAt(0) === "{")
    return JSON.parse(value);
  return null;
}

async function checkExistBlog(id) {
  const blog = await BlogModel.findById(id);
  if(!blog) throw createHttpError.NotFound("بلاگ مورد نظر یافت نشد");
  return blog
}
async function checkExistCourse(id) {
  const course = await CourseModel.findById(id);
  if(!course) throw createHttpError.NotFound("دوره مورد نظر یافت نشد");
  return course
}
async function checkExistProduct(id) {
  const product = await ProductModel.findById(id);
  if(!product) throw createHttpError.NotFound("دوره مورد نظر یافت نشد");
  return product
}

module.exports = {
    toObject,
    parseLiteral,
    parseValueNode,
    parseObject,
    checkExistProduct,checkExistCourse,checkExistBlog
}