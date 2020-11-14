import React, {Component} from 'react';
import axios from 'axios';
import Draggable from './Draggable'

var fs = require('fs'),
    path = require('path')

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.argv[2]), false, null));
}

class Hub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className="app-element">
                {this.state.loading ?
                    <div className="app-loading">
                        <div class="spinning-loader"></div>
                    </div>
                    :
                    <Draggable>
                        <div>one</div>
                    </Draggable>
                }
            </div>
        )
    }
}

export default Hub;
