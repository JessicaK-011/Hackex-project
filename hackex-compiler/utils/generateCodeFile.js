const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const dirExecutionCodes = path.join(__dirname, "executionCodes");

if (!fs.existsSync(dirExecutionCodes)) {
  fs.mkdirSync(dirExecutionCodes, { recursive: true });
}

// Function to extract the class name from Java code
function extractJavaClassName(code) {
  const classNameRegex = /public\s+class\s+(\w+)/;
  const match = classNameRegex.exec(code);
  return match ? match[1] : null;
}

// function handleJava(executionCode) {
//   const className = extractJavaClassName(executionCode);
//   if (!className) {
//     throw new Error("Class name not found in the Java code.");
//   }
//   const fileName = `${className}.java`;
//   const filePath = path.join(dirExecutionCodes, fileName);

//   fs.writeFileSync(filePath, executionCode);

//   // Extract the class name

//   return filePath;
// }
function handleJava(executionCode) {
  const className = extractJavaClassName(executionCode);
  if (!className) {
    throw new Error("Class name not found in the Java code.");
  }
  
  // 1. Generate a unique folder for this specific request 
  const executionId = uuidv4();
  const folderPath = path.join(dirExecutionCodes, executionId);
  fs.mkdirSync(folderPath, { recursive: true });

  // 2. Save Main.java inside its own isolated folder 📁
  const filePath = path.join(folderPath, `${className}.java`);
  fs.writeFileSync(filePath, executionCode);

  return filePath;
}

const generateCodeFile = (langName, executionCode) => {
  if (langName === "java") {
    return handleJava(executionCode);
  }
  const executionId = uuidv4();
  const fileName = `${executionId}.${langName}`;
  fs.writeFileSync(path.join(dirExecutionCodes, fileName), executionCode);
  return path.join(dirExecutionCodes, fileName);
};

module.exports = { generateCodeFile };
