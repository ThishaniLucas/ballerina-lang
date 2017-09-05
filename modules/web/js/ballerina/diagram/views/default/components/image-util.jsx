/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import $ from 'jquery';

/**
 * Gets the base name of a file.
 *
 * @param {string} filename The file name.
 * @param {string} ext The extension.
 * @returns {string} Base name.
 */
function getBasename(filename, ext) {
    return filename.substring(2, filename.indexOf(ext));
}

/**
 * Gets a list of all svg files.
 *
 * @param {func} requireContext Webpack func.
 * @returns {Object} The components for the svgs.
 */
function requireAll(requireContext) {
    const components = {};
    requireContext.keys().forEach((item) => {
        const module = requireContext(item);
        if (module) {
            components[getBasename(item, '.svg')] = module;
        }
    });
    return components;
}

const images = requireAll(require.context('images', true, /\.svg$/));

/**
 * Utility class for images.
 *
 * @class ImageUtils
 */
class ImageUtils {
    /**
     * Gets the base64 string for svg images.
     *
     * @static
     * @param {string} iconName The name of the icon.
     * @returns {string} Base64 string for xlinkHref.
     * @memberof ImageUtils
     */
    static getSVGIconString(iconName) {
        return images[iconName];
    }

    /**
     * Get the connector icon from service
     * @param {string} connectorName - connector name
     * @returns {object} - server response data
     */
    static getConnectorIcon(connectorName) {
        const requestJson = {
            connectorName: connectorName,
            iconPath: 'testPath',
        };
        let data = {};
        $.ajax({
            type: 'POST',
            context: this,
            url: 'http://localhost:8289/file/connector/icon',
            data: JSON.stringify(requestJson),
            contentType: 'application/json; charset=utf-8',
            async: false,
            dataType: 'json',
            success(response) {
                if (response.status === 'succes') {
                    data = response.content;
                } else {
                    data = this.getSVGIconString('tool-icons/connector-white');
                }
            },
            error() {
                data = this.getSVGIconString('tool-icons/connector-white');
            },
        });
        return data;
    }
}

export default ImageUtils;
