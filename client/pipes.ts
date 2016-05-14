/// <reference path="../typings/index.d.ts" />
import {Pipe} from '@angular/core';
import {emojify} from 'node-emoji';

@Pipe({
    name: 'emojify'
})
export class EmojifyPipe {
    transform(text) {
        return emojify(text);
    }
}
