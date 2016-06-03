'use strict';
import template from 'art-template';
import fs from 'fs';
import path from 'path';

let Base = think.adapter('template', 'base');
export default class extends Base {
	/**
	 * run
	 * @param {String} templateFile []
	 * @param {Object} tVar         []
	 * @param {Object} config       []
	 * @return {Promise}            []
	 */
	async run(templateFile, tVar, config){
		let temp_path = templateFile.split(".html")[0];
		let helper_path = config.helper_path || undefined;
		let helper;

		//判断是否有helper函数并执行
		if( !helper_path || !( await fileExists(helper_path) ) ){
			helper_path = '../template.helper.js';
		}
		helper = require(helper_path);
		helper(template);

        template.config("cache", false);
        return template(temp_path, tVar);
	}
}

//判断模板文件是否存在
async function fileExists(filePath) {
	return new Promise((resolve, reject)=>{
		fs.exists(filePath, function(exists) { 
			if( exists ){
				resolve(true);
				return;
			}
			resolve(false);
		});
	});
}