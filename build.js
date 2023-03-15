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
	if(item.type=="google-closure-compiler"){
		console.log(`Compile ${item.file} to ${item.language}`);
		console.log(execSync(`${item.type} --language_out "${item.language}" --js "${item.file}" --js_output_file "build/${item.file}"`).toString());
	}else{
		console.log("not allowed type "+item.type);
	}
}
