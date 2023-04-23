import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";

@NgModule({
  imports:[
    HttpClientModule,
    // With npm i ngx-quill --no-audit and npm i quill --no-audit(плагін на редактор тексту) QuillModule.forRoot()
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule
  ]
})
export class SharedModule {

}
