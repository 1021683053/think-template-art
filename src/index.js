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

		let adapter = config.art || {};

		let suffix = config.file_ext || ".art";
		let temp_path = templateFile.split(suffix)[0];
		let helper_path = config.helper_path || undefined;

        // 判断是否有helper函数并执行
        if( !helper_path || !( await fileExists(helper_path) ) ){
            helper_path = '../template.helper.js';
        };

		let defaults = template.defaults;

        //引入Helper
		let helpers = require(helper_path);
		Object.keys(helpers).forEach((key)=>{
			defaults.imports[key] = helpers[key];
		});

        let options = defaults.$extend({
            debug: process.env.NODE_ENV !== 'production'
        });

		options.filename = temp_path;
		options.extname = suffix;

		Object.assign(options, adapter);

        return template.compile(options)(tVar);
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
