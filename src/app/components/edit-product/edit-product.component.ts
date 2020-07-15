import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NumberValueAccessor, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ImgUploadService } from '../../shared/services/img-upload.service';
import { map } from 'rxjs/operators';
import { Product } from "../../shared/services/product";
import { ProductService } from "../../shared/services/product.service";
import { DatePipe } from '@angular/common';
import { TranslationService } from "../../shared/services/translation.service";
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';


export interface PreviewData {
  file: any;
  fileData: any;
  Progress: number;
  fileUrl: string;
}
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // angForm: FormGroup;

  matchFound: boolean;
  displayProgress: boolean;
  spinner = false;
  cols: 1;
  rows: 1;
  products: any = {};
  files: any;
  error: string;
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
  list = [];
  id = '';
  pID = 0;

  constructor(private ss:StorageService, private route: ActivatedRoute, private ts: TranslationService, public datepipe: DatePipe, private _snackBar: MatSnackBar, private fb: FormBuilder, private is: ImgUploadService, private ps: ProductService) {
    // this.createForm();
    this.ss.sharedData.subscribe(storage => {
      this.list = storage;
      // console.log(JSON.stringify('size' + this.list.length));
    });
  }


  form = this.fb.group({
    ProductName: ['', [Validators.required]],
    ProductLocalName: [''],
    ProductDescription: [''],
    ProductDetail: [''],
    ProductOwner: ['', [Validators.required]],
    ProductKeys: [this.keys],
    Category: ['', [Validators.required]],
    SubCategory: ['', [Validators.required]],

  });

  setData(){
   
    console.log(this.id);
    console.log(this.list);
    
    const product = this.list.find(p => p.id === this.id);
    console.log(product);
    this.pID = product.pID;
    this.form.controls.ProductName.setValue(product.ProductName); 
    this.form.controls.SubCategory.setValue(product.SubCategory); 
    this.form.controls.Category.setValue(product.Category); 
    this.form.controls.ProductOwner.setValue(product.ProductOwner); 
    this.form.controls.ProductLocalName.setValue(product.ProductLocalName); 
    this.form.controls.ProductDescription.setValue(product.ProductDescription); 
    this.form.controls.ProductDetail.setValue(product.ProductDetail); 
    // this.form.controls.ProductKeys.setValue(this.keys); 
    console.log(5);
    
    for (let i = 0; i < product.numberOfVariants; i++) {
      this.t.push(this.fb.group({
        vID: [product.variants[i].vID],
        ProductMRP: [product.variants[i].ProductMRP, Validators.required],
        ProductPrice: [product.variants[i].ProductPrice, [Validators.required, Validators.min(1), Validators.max(1000000),]],
        quantity: [product.variants[i].quantity, Validators.required],
        metric: [product.variants[i].metric],
        imageAvl: [product.variants[i].imageAvl],
        availStock: [product.variants[i].availStock],
        UploadedImages: [product.variants[i].UploadedImages],
      }));
console.log(6);

      if (product.variants[i].imageAvl) {
        this.map.set(i,product.variants[i].UploadedImages );
      }
    }
    this.keys = product.ProductKeys;
  }

  //text ='How are you';
  async getTransalation() {
    await this.ts.getText(this.form.controls.ProductName.value);
    await this.form.controls.ProductLocalName.setValue(this.ts.inTelugu);
  }



  getErrorMessage(filedName: string, i) {
    switch (filedName) {
      case 'ProductName':
        return this.form.controls.ProductName.hasError('required') ? 'You must enter a value' : '';
        break;

      case 'ProductPrice':
        return this.t.controls[i].get('ProductPrice').hasError('required') ? 'You must enter a value' :
          this.t.controls[i].get('ProductMRP').value < this.t.controls[i].get('ProductPrice').value ? 'Should not be less than MRP' :
            this.t.controls[i].get('ProductPrice').hasError('min') ? 'You can not sale anything free' :
              this.t.controls[i].get('ProductPrice').hasError('max') ? 'Value exceed the limit' :
                '';
        break;
      case 'ProductMRP':
        return this.t.controls[i].get('ProductMRP').hasError('required') ? 'You must enter a value' : ''
        break;
      case 'quantity':
        return this.t.controls[i].get('quantity').hasError('required') ? 'You must enter a value' : ''
        break;

      case 'Suggestion':
        return 'No suggestions found.Please try diffrent keyword';
        break;

      case 'API_issue':
        return 'Unexpected API issue. Please try again.';
        break;

      case 'ProductOwner':
        return this.form.controls.ProductOwner.hasError('required') ? 'You must enter a bramd name' : '';
        break;

      case 'Category':
        return this.form.controls.Category.hasError('required') ? 'You must enter a Category' : '';
        break;
      case 'SubCategory':
        return this.form.controls.SubCategory.hasError('required') ? 'You must enter a SubCategory' : '';
        break;


      default:
        break;
    }


  }
  private pRow: Product;



  dynamicForm: FormGroup;
  submitted = false;
  metoptions: string[] = ['qty', 'gram', 'kg', 'litre', 'ml', 'cm'];
  ngOnInit() {

    this.dynamicForm = this.fb.group({
      numberOfVariants: [1],
      variants: new FormArray([])
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      
      this.setData();
    });
    
    // this.dynamicForm.controls.numberOfVariants.setValue(1);
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.variants as FormArray; }

  onChangeVariants(e) {
    console.log('onChangeVariants' + e.value);

    const numberOfVariants = e.value || 0;
    if (this.t.length < numberOfVariants) {
      for (let i = this.t.length; i < numberOfVariants; i++) {
        this.t.push(this.fb.group({
          vID: [''],
          ProductMRP: [, Validators.required],
          ProductPrice: [, [Validators.required, Validators.min(1), Validators.max(1000000)]],
          quantity: [, Validators.required],
          metric: ['', Validators.required],
          imageAvl: [false],
          availStock: [],
          UploadedImages: [[]],
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
    if (this.dynamicForm.invalid || this.form.invalid) {
      this.openSnackBar('Invalid Data');
    } else {
      console.log(this.form);
      console.log(this.dynamicForm);
      console.log(this.map);
      console.log(this.form.value);
      // console.log(JSON.stringify(this.dynamicForm.value));
      this.pRow = <Product>this.form.value;
      this.pRow.numberOfVariants = this.dynamicForm.value.numberOfVariants;
      let varArr = new Array();
      varArr = this.dynamicForm.value.variants;
      varArr.forEach(element => {
        let key = varArr.indexOf(element);
        element.vID = key;
        if (this.map.has(key)) {

          element.UploadedImages = this.map.get(key);
          element.UploadedImages.forEach(ele => {
            if (ele.fileUrl.data.display_url === undefined) {
              ele.file = "";
            } else {
              ele.file = ele.fileUrl.data.display_url;
            }

            element.UploadedImages[element.UploadedImages.indexOf(ele)] = ele;
          });
        }
        this.dynamicForm.value.variants[key] = element;

      });
      this.pRow.variants = this.dynamicForm.value.variants;
      console.log(this.pRow);
      let date = new Date();

      this.pRow.pID = Number(this.datepipe.transform(date, 'yyMMddHHmmss'));
      let data = <Product>this.pRow;


      console.log(JSON.parse(JSON.stringify(data)));
      data.pID = this.pID;
      this.ps.updateProduct(JSON.parse(JSON.stringify(data)), this.id).then(res => {
        /*do something here....maybe clear the form or give a success message*/
        console.log(res);

      });

    }
    // this.keys = [];

  }

  // onReset() {
  //   // reset whole form back to initial state
  //   this.submitted = false;
  //   this.dynamicForm.reset();
  //   this.form.reset();
  //   this.t.clear();
  //   this.keys = [];
  // }

  onClear() {
    // clear errors and reset variant fields
    this.submitted = false;
    this.t.reset();
    this.keys = [];
    this.form.reset();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  map = new Map();
  onFileSelect(event, variant) {
    //  console.log('-------------------'+ this.dynamicForm.controls.variants.value.);
    let index = this.t.controls.indexOf(variant);
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
        const viewFile: PreviewData = { file, fileData, Progress, fileUrl };
        let variantArray = new Array();
        console.log('map size :' + this.map.size);
        console.log(viewFile);

        if (this.map.size > 0 && this.map.get(index) !== undefined) {
          variantArray = this.map.get(index);
        }
        variantArray.push(viewFile);
        this.map.set(index, variantArray);
        //  this.map.set(sta.name, viewFile);
      };

    }
    console.log(this.map);

  }

  Uploader(variant) {
    let index = this.t.controls.indexOf(variant);
    this.displayProgress = true;

    let oneVar = this.map.get(index);
    const fd = new FormData();

    oneVar.forEach(element => {
      console.log(element);
      let position = oneVar.indexOf(element);
      fd.append('image', element.fileData, element.fileData.name);
      if (element.Progress < 98) {
        this.is.addImages(fd, element.fileData.name).subscribe(
          (res) => {
            this.serverData = res;
            if (typeof this.serverData === 'string') {
              console.log('if');
              console.log(res);
            } else if (res.hasOwnProperty('data')) {
              console.log('pdata');
              console.log(res);
              element.fileUrl = this.serverData;
              oneVar[position] = element;
              this.map.set(index, oneVar);
              console.log(map);

            } else {
              console.log('else');
              console.log(this.serverData.fname);
              console.log(this.serverData.message);
              const a = this.serverData.fname;
              const b = oneVar[position];
              b.Progress = this.serverData.message;
              oneVar[position] = b;
              this.map.set(index, oneVar);
            }
          },
          (err) => {
            this.error = err;
            console.log(this.error);
          }
        );
      }
    });
  }

  removeImage(key: any, variant) {

    let index = this.t.controls.indexOf(variant);
    console.log(this.map.get(index));
    let imgArr = this.map.get(index);

    imgArr = imgArr.filter(obj => obj !== key);
    console.log(imgArr);
    this.map.set(index, imgArr);
    // variant.set('UploadedImages').value = variant.get('UploadedImages').value.delete(key);
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

  remove(key: any): void {
    console.log(this.keys);
    this.keys = this.keys.filter(obj => obj !== key);
  }

}