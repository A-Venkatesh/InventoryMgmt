import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray, FormControl, NumberValueAccessor, } from '@angular/forms';
// import { ProductsService} from '../service/products.service';
// import { ImgUploadService} from '../service/img-upload.service';
import { TitleCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isString } from 'util';
import { MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { format } from 'url';

export interface Tile {
  Authors: string;
Title: string;
Url: string;
imgUrl: string;
}

export interface PreviewData {
  file: any;
  fileData: any;
  Progress: number;
  fileUrl: string;
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // angForm: FormGroup;

  matchFound: boolean;
  displayProgress: boolean;
  spinner = false;
  cols: 1;
  rows: 1;
  list: string;
  products: any = {};
  tiles: Tile[] = [];
  files: any;
  error: string;
   map = new Map();
   serverData: any;

   finalImageList = [];
   suggestedImgList = [];
   imgBBList = [];

  //  chip variables
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keys = [];

  constructor( private _snackBar: MatSnackBar, private fb: FormBuilder) {
    // this.createForm();
  }


  form = this.fb.group({
    ProductName: ['', [Validators.required]],
    ProductLocalName: [''],
    ProductMRP: [''],
    ProductPrice: ['', [Validators.required, Validators.min(1), Validators.max(100000000)]],
    ProductDescription: [''],
    ProductDetail: [''],
    ProductOwner: [''],
    AgeGroup: [3],
    ProductKeys: [this.keys],
    ProductImages: [this.finalImageList],
    UploadedImages: [[]],
    
    Category:[''],
    SubCategory:[''],

  });
  // form = new FormGroup({
  //   ProductName: new FormControl('', [Validators.required, ]),
  //   ProductPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000000), ]),
  // });


  formatLabel(value: number) {
    if (value >= 19) {
      return 'Adult';
    }

    return value + '+';
  }
  getErrorMessage(filedName: string) {

    switch (filedName) {
      case 'ProductName':
        return this.form.controls.ProductName.hasError('required') ? 'You must enter a value' : '';
        break;

      case 'ProductPrice':
        return this.form.controls.ProductPrice.hasError('required') ? 'You must enter a value' :
          this.form.controls.ProductPrice.hasError('min') ? 'You can not sale anything free' :
            this.form.controls.ProductPrice.hasError('max') ? 'Value exceed the limit' :
              '';
        break;

        case 'Suggestion':
          return 'No suggestions found.Please try diffrent keyword';
          break;

      case 'API_issue':
      return 'Unexpected API issue. Please try again.';
      break;

      default:
        break;
    }


  }

  // createForm() {
  //   this.angForm = this.fb.group({
  //     ProductName: ['', Validators.required ],
  //     ProductDescription: ['', Validators.required ],
  //     ProductPrice: ['', Validators.required ]
  //   });
  // }

  addProduct(formValues) {
const temp = [];



for (const element of this.suggestedImgList) {
if (element.check === true) {
this.finalImageList.push(element.url);
}
}
this.form.controls.ProductImages.setValue(this.finalImageList);

const bar = new Promise((resolve, reject) => {
  this.map.forEach((value: PreviewData, key: any) => {
    console.log(value);
    temp.push(value.fileUrl);
      });
  resolve();
    });
bar.then(() => {
      console.log('All done!');
      this.form.controls.UploadedImages.setValue(temp) ;
      console.log(formValues);
  });
//this.ps.addProduct(this.form.value);
  }
//   findMatch() {
//     this.spinner = true;
//     this.ps.suggestProduct(this.form.controls.ProductName.value).subscribe((data: any) => {
//     this.tiles = data;
//     console.log(data);
//     this.spinner = false;
//     if (this.tiles.length > 0) {
//       this.matchFound = true;
//     } else {
//     // this.warningForNullResult();
//    this.openSnackBar(this.getErrorMessage('Suggestion'));
//     }
// },
// (err) => {this.error = err;
//           console.log(this.error);
//           this.spinner = false;
//           this.openSnackBar(this.getErrorMessage('API_issue'));
// }
// );
//     console.log(this.tiles.length);



//   }

  findContentFromMatch(data: Tile) {
    console.log(data);

    const url = data.Url;
    console.log(url);
//     this.ps.getContentforProduct(url).subscribe(
//   (res) => {
// console.log(res);
// this.setFormValues(res, data);
//   }
//   ,
//         (err) => {this.error = err;
//                   console.log(this.error);
//         }
//         );

  }
  dynamicForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.dynamicForm = this.fb.group({
      numberOfVariants: ['', Validators.required],
      variants: new FormArray([])
  });

  this.t.push(this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
}));
  // this.dynamicForm.controls.numberOfVariants.setValue(1);
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.variants as FormArray; }

  onChangeVariants(e) {
    console.log('onChangeVariants'+ e.value );
    
    const numberOfVariants = e.value || 0;
    if (this.t.length < numberOfVariants) {
        for (let i = this.t.length; i < numberOfVariants; i++) {
            this.t.push(this.fb.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfVariants; i--) {
            this.t.removeAt(i);
        }
    }
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.dynamicForm.invalid) {
      return;
  }

  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
}

onReset() {
  // reset whole form back to initial state
  this.submitted = false;
  this.dynamicForm.reset();
  this.t.clear();
}

onClear() {
  // clear errors and reset variant fields
  this.submitted = false;
  this.t.reset();
}


  setFormValues(res, data: Tile) {
console.log(res.mrp);

console.log(Number(res.mrp.substring(0, res.mrp.indexOf('.'))));

this.form.controls.ProductMRP.setValue(Number(res.mrp.substring(0, res.mrp.indexOf('.'))));
this.form.controls.ProductPrice.setValue(Number(res.price.substring(0, res.price.indexOf('.'))));
this.form.controls.ProductDetail.setValue(res.productDetail);
this.form.controls.ProductDescription.setValue(res.productDescription);
this.form.controls.ProductOwner.setValue(data.Authors.substring( data.Authors.indexOf('by') + 2, data.Authors.indexOf('|')).trim());
this.keys = res.segment;
    // this.form.controls.AgeGroup.setValue();
this.form.controls.ProductName.setValue(data.Title);
this.form.controls.ProductCategory.setValue(res.segment);
console.log(res.imgUrl);

console.log(typeof(res.imgUrl));

const temp: [string] = res.imgUrl.split('mainUrl');
console.log(temp);
this.suggestedImgList = [];
for (const element of temp) {


  console.log(element);
  const url = element.substring(element.indexOf(':') + 2, element.indexOf(',') - 1);
  if (!url.includes('[')) {
  const name = url.substr(url.lastIndexOf('/') + 1);
  const check = true;
  this.suggestedImgList.push({name, url, check});
  console.log(this.suggestedImgList);
  }
}
 }

    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 2000,
      });
    }

  onFileSelect(event) {
this.files = event.target.files;
console.log(this.files);

for (const sta of this.files) {
  let file: any;
  let fileData: any;
  let Progress: number;
  const fileUrl = '';
  Progress = 0;
  const reader = new FileReader();
  reader.readAsDataURL(sta);
  reader.onload = (_event) => {
    file = reader.result;
    fileData = sta;
    const viewFile: PreviewData = {file, fileData, Progress, fileUrl };

    this.map.set(sta.name, viewFile);
  };

}
}

  Uploader() {
    this.displayProgress = true;

    this.map.forEach((value: any, key: any) => {
      console.log(key, value);

      console.log(value);
      const fd = new FormData();
      fd.append('image', value.fileData, value.fileData.name);
      if (value.Progress < 98) {
      //   this.is.addImages(fd , value.fileData.name).subscribe(
      //   (res) => {// this.uploadResponse = res;
      //             this.serverData = res;
      //             if (typeof this.serverData === 'string') {
      //               console.log('if');
      //               console.log(res);


      //     } else if (res.hasOwnProperty('data')) {
      //       console.log('pdata');
      //       console.log(res);
      //       this.imgBBList.push(this.serverData.data);
      //       const a = this.serverData.data.image.filename;
      //       console.log(a);


      //       value.fileUrl = this.serverData.data.image.url;
      //       this.map.set(key, value);
      //       this.storeImgDetailDB(this.serverData.data);
      //       console.log(this.map);

      //     } else {
      //       console.log('else');
      //       console.log(this.serverData.fname);
      //       console.log(this.serverData.message);
      //       const a = this.serverData.fname;
      //       const b = this.map.get(a);
      //       b.Progress = this.serverData.message;
      //       this.map.set(a, b);
      //       // this.indexedArray[a]=b;
      //       // console.log(this.indexedArray);

      //      // console.log(this.uploadResponse);
      //     }
      //   },
      //   (err) => {this.error = err;
      //             console.log(this.error);
      //   }
      // );
      }
    });

  }

  removeImage(key: any) {
this.map.delete(key);
  }

  storeImgDetailDB(data: any) {
    console.log('uuuuuuuu' + data.id);

    // this.is.storeImgDetail(data.id , data).subscribe(
    //   (res) => {
    //     console.log(res);


    //   },
    //   (err) => {
    //     console.log(err);

    //   }
    // );
  }

add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;
    console.log('value' + event);
    console.log(input);
    console.log('vs  ' + this.keys);

    // Add our category
    if ((value || '').trim()) {


      this.keys.push(value.trim());
    }

    // Reset the input value
    if (input) {

      input.value = '';
    }
  }

  remove(category: any): void {
    const index = this.keys.indexOf(category);

    if (index >= 0) {
      this.keys.splice(index, 1);
    }
  }


  Unselect(image) {

    const pos = this.suggestedImgList.indexOf(image);
    console.log( this.suggestedImgList[pos].check);
    this.suggestedImgList[pos].check = this.suggestedImgList[pos].check ? false : true;
    console.log( this.suggestedImgList[pos].check);
  }
}