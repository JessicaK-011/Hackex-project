// User Java Code
//       ↓
// Solution.java stored
//       ↓
// javac Solution.java
//       ↓
// Solution.class created
//       ↓
// java Solution
//       ↓
// Input file → System.in
//       ↓
// Output → Solution.txt
//       ↓
// Node reads Solution.txt
//       ↓
// Output returned
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const outPath = path.join(__dirname, "outputExe");

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

// eslint-disable-next-line no-unused-vars
const executeCodeJava = (filePath, inputPath) => {
  const className = path.basename(filePath, ".java"); // Class name is the same as the file name without extension
  const outputPath = path.join(outPath, `${className}.txt`); // Path for the output file

  return new Promise((resolve, reject) => {
    // Compile the Java file
    exec(`javac ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Compilation Error: ${stderr}`);
        return;
      }

      // Run the compiled Java file
      exec(
        `java -cp ${path.dirname(filePath)} ${className} < ${inputPath} > ${outputPath}`,
        (err, stdout, stderr) => {
          if (err) {
            reject(`Runtime Error: ${stderr}`);
            return;
          }

          // Read the output from the file
          fs.readFile(outputPath, "utf8", (readErr, data) => {
            if (readErr) {
              reject(`Read Error: ${readErr}`);
              return;
            }

            // Resolve with the output data
            resolve(data);
          });
        }
      );
    });
  });
};

module.exports = { executeCodeJava };
