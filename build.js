#!/bin/env node
const {writeFileSync,readFileSync}=require("fs");
const {execSync}=require("child_process");

function getBuildJson(){
	let build;
	try{
		build=JSON.parse(readFileSync("build.json","utf-8"));
	}catch(e){
		console.log("no build.json found");
		process.exit(1);
	}
	return build;
}

const path=process.cwd();

process.chdir(process.argv[2]||".");
const build=getBuildJson();
try{
	execSync("mkdir build");
}catch(e){}

for(let item of build){
	item={
		type: null,
		file: null,
		language: "ECMASCRIPT3_STRICT",
		polyfills: true,
		...item,
	};
	if(item.type=="google-closure-compiler"){
		console.log(`Compile ${item.file} to ${item.language}`);
		let cmd=item.type;
		cmd+=` --js "${item.file}"`;
		cmd+=` --js_output_file "build/${item.file}"`;
		cmd+=` --language_out "${item.language}"`;
		cmd+=item.polyfills?"":" --rewrite_polyfills false";
		console.log("COMD:",cmd);
		console.log(execSync(cmd).toString("utf-8"));
	}else{
		console.log("not allowed type "+item.type);
	}
}
