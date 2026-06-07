const fs = require('fs');
const file = 'src/components/SettingsPanel.tsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const startIndex = 356; // 0-based is 356
const endIndex = 726; // 0-based is 726

// Get the block to move
const block = lines.slice(startIndex, endIndex + 1);

// Remove the block
lines.splice(startIndex, endIndex - startIndex + 1);

// Find the insertion point: where it used to be "           )}" for tools tab
// tools tab ends around line 246 (in original). Since we deleted, we need to search exactly.
const settingTabToolsEnd = lines.findIndex(line => line.includes("           )} // END OF TOOLS TAB"));
// Wait, the tools tab ends with:
//                  </button>
//               </div>
//            )}
// Let's find: "{settingTab === 'akun' && ("
let insertIndex = lines.findIndex(line => line.includes("{settingTab === 'akun' && ("));

if (insertIndex > -1) {
    // We insert it above the `settingTab === 'akun'` block
    lines.splice(insertIndex, 0, ...block);
    fs.writeFileSync(file, lines.join('\n'));
    console.log("Block moved successfully!");
} else {
    console.log("Could not find insertion point!");
}
