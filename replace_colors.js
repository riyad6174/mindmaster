const fs = require("fs");
const path = require("path");

const hexMap = {
  "#006a2d": "#1a84d2",     // Dark green to primary blue
  "#6bff8f": "#6bb1ff",     // Bright green to bright blue
  "#e8fff4": "#e8f4ff",     // Light green bg to light blue bg
  "#86efac": "#86c8ef",     // Light green border to light blue border
  "#004a1d": "#003459",     // Dark text shade
  "rgba(107,255,143,1)": "rgba(107,177,255,1)", // Shadow color
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".css") || file.endsWith(".jsx") || file.endsWith(".js")) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, "src"));

let changedFiles = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let newContent = content;
  let changed = false;

  for (const [oldC, newC] of Object.entries(hexMap)) {
    // Escape rgba parenthesis for regex if needed, but simple string replaceAll is better
    // Note: Node 15+ has replaceAll
    if (newContent.includes(oldC)) {
      newContent = newContent.split(oldC).join(newC);
      changed = true;
    }
  }

  // Also replace #006A2D uppercase variants just in case
  for (const [oldC, newC] of Object.entries(hexMap)) {
    const oldUpper = oldC.toUpperCase();
    if (newContent.includes(oldUpper)) {
      newContent = newContent.split(oldUpper).join(newC);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, newContent, "utf8");
    changedFiles++;
    console.log(`Updated colors in ${file}`);
  }
});

console.log(`Updates complete. ${changedFiles} files modified.`);

