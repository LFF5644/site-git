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

process.chdir(process.argv[2]||".");
const build=getBuildJson();
execSync("mkdir build");

for(let item of build){
	if(item.type=="google-closure-compiler"){
		console.log(`Compile ${item.file} to ${item.language}`);
		execSync(`${item.type} --language_out "${item.language}" --js_output_file "build/${item.file}" "${item.file}"`);
	}else{
		console.log("not allowed type "+item.type);
	}
}
