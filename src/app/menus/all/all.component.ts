import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  constructor(private modalService : BsModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.saveNewCollectionForm = this.formBuilder.group({
      name : ['',[Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
    });

    this.saveNewChildForm = this.formBuilder.group({
      name : ['',[Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
      collection :['']
    });

    this.saveNewGrandChildForm = this.formBuilder.group({
      name : ['',[Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
      addEditor :[''],
      collection :[''],
      child : ['']
    });


    this.savedCollectionInDB  = JSON.parse(localStorage.getItem("editor"));
    if(this.savedCollectionInDB==null){
      this.savedCollectionInDB ={};
    }

  }

  //Will be used to keep refrence of save new collection bootstrap modal
  saveNewCollectionModal: BsModalRef;
  
  //Will be used to keep refrence of save new child bootstrap modal
  saveNewChildModal : BsModalRef;

  //Will be used to keep refrence of save new grand child bootstrap modal
  saveNewGrandChildModal : BsModalRef;

  //Will be used to keep refrence of add new collection form
  saveNewCollectionForm : FormGroup;

  //Will be used to keep refrence of add new child form
  saveNewChildForm : FormGroup;

  //Will be used to keep refrence of add new child form
  saveNewGrandChildForm : FormGroup;

  //saved collection objects
  savedCollectionInDB : any;

  /**
   * On click of add new Collection new method will be called <br>
   * Will be used to Open modal which will be used to get details for new Collection <br>
   * All collections are saved in local storage <br>
   */
  openNewCollectionModal(template: TemplateRef<any>){
    this.saveNewCollectionForm.reset();
    this.saveNewCollectionModal = this.modalService.show(template);
  }

  /**
   * To open child modal and set collection value into form
   * @param collection 
   * @param template 
   */
  openNewChildModal(collection:any,template: TemplateRef<any>){
    this.saveNewChildForm.reset();
    this.saveNewChildForm.setValue({
      collection: collection,
      name:''
    });
    this.saveNewChildModal = this.modalService.show(template);
  }

  /**
   * To open grand child modal and set collection and child values into form
   * @param collection 
   * @param child 
   * @param template 
   */
  openNewGrandChildModal(collection:any,child:any,template: TemplateRef<any>){
    this.saveNewGrandChildForm.reset();
    this.saveNewGrandChildForm.setValue({
      collection: collection,
      child:child,
      name:'',
      addEditor:false,
    });
    this.saveNewGrandChildModal = this.modalService.show(template);
  }
  /**
   * This method will be used to create new collection in local DB <br>
   * First method will check form is valid or not <br>
   * If valied than 
   * It will check is there any object exist in local storage name by editor <br>
   * If editor is not found in DB, this method will first create a Object editor in DB <br>
   * //TODO : Do not allow duplicate name for collection and there child
   */
  saveNewCollectionInLocalStorage(){
      var isFormValid = this.saveNewCollectionForm.valid;

      if(isFormValid){
        var editor =  JSON.parse(localStorage.getItem("editor"));
      if(editor == null  || typeof editor == undefined ){
        editor = {};
        localStorage.setItem("editor",JSON.stringify(editor));
      }

      editor[this.saveNewCollectionForm.value['name']] = {}
      localStorage.setItem("editor",JSON.stringify(editor));
      this.savedCollectionInDB = editor;
      this.saveNewCollectionModal.hide();
    }
  }

  /**
   * To delete existing collection in DB  <br>
   * Will Delete Collection and Update in var this.savedCollectionInDB
   * @param collection 
   */
  deleteCollection(collection : any){
    if(collection!=null && typeof collection!= undefined){
      var editor =  JSON.parse(localStorage.getItem("editor"));
      if(editor != null){
        delete editor[collection['key']];
        localStorage.setItem("editor",JSON.stringify(editor));
        this.savedCollectionInDB = editor;
        window.location.href = "/"
      }
    }else{
      console.warn("Can't delete collection, it is empty")
    }
  }

  /**
   * This method is used to save new child in DB <br>
   * Based on saveNewChildForm this method will feched saved collection in DB <br>
   * For that collection method will store new child for collection
   */
  saveNewChildInLocalStorage(){
    var isFormValid = this.saveNewChildForm.valid;
    if(isFormValid){
      var editor =  JSON.parse(localStorage.getItem("editor"));
      if(editor != null){
        var collection = this.saveNewChildForm.value['collection'];
        var newChildName = this.saveNewChildForm.value['name'];
        collection['value'][newChildName] = {};
        editor[collection['key']] = collection['value'];
        localStorage.setItem("editor",JSON.stringify(editor));
        this.savedCollectionInDB = editor;
        this.saveNewChildModal.hide();
      }else{
        console.warn("Can't add child, editor it is empty")
      }
    }
  }

  /**
   * This method is will be used to save grand child for a collection <br>
   * Based on collection all child will be fetched <br>
   * Among the childs one child will be fetched for wich grand child will going to be stored <br>
   */
  saveNewGrandChildInLocalStorage(){
    var isFormValid = this.saveNewGrandChildForm.valid;
    if(isFormValid){
      var editor =  JSON.parse(localStorage.getItem("editor"));
      if(editor != null){
        var collection = this.saveNewGrandChildForm.value['collection'];
        var child = this.saveNewGrandChildForm.value['child'];
        var grandChildName = this.saveNewGrandChildForm.value['name'];
        var addEditor = this.saveNewGrandChildForm.value['addEditor'];
        collection['value'][child['key']][grandChildName] = {
          addEditor : addEditor
        };
        editor[collection['key']] = collection['value'];
        localStorage.setItem("editor",JSON.stringify(editor));
        this.savedCollectionInDB = editor;
        this.saveNewGrandChildModal.hide();
      }else{
        console.warn("Can't add grand child, editor it is empty")
      }
    }

  }
}
