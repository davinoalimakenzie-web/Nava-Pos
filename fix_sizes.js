import fs from 'fs';

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // Increase font size
    content = content.replace(/text-\[11px\]/g, 'text-[13px]');
    content = content.replace(/text-\[10px\]/g, 'text-[12px]');
    // Increase summary box sizes
    content = content.replace(/text-\[12px\]/g, 'text-base');
    
    // Increase heights
    content = content.replace(/h-5/g, 'h-[26px]');
    content = content.replace(/h-\[22px\]/g, 'h-[26px]');

    // Increase width of summary cards
    content = content.replace(/w-36/g, 'w-44');
    content = content.replace(/w-40/g, 'w-48');

    // Capitalize inputs
    content = content.replace(/setNota\(e\.target\.value\)/g, 'setNota(e.target.value.toUpperCase())');
    content = content.replace(/setNamaUser\(e\.target\.value\)/g, 'setNamaUser(e.target.value.toUpperCase())');
    content = content.replace(/setNoWaUser\(e\.target\.value\)/g, 'setNoWaUser(e.target.value.toUpperCase())');
    content = content.replace(/setDevice\(e\.target\.value\)/g, 'setDevice(e.target.value.toUpperCase())');
    content = content.replace(/setKeluhan\(e\.target\.value\)/g, 'setKeluhan(e.target.value.toUpperCase())');
    content = content.replace(/setFilterNoNotaInput\(e\.target\.value\)/g, 'setFilterNoNotaInput(e.target.value.toUpperCase())');
    content = content.replace(/setKeterangan\(e\.target\.value\)/g, 'setKeterangan(e.target.value.toUpperCase())');

    fs.writeFileSync(filepath, content);
}

processFile('src/components/BukuBesar.tsx');
processFile('src/components/InputCashflow.tsx');
