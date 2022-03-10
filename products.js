import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

import  pagination  from './pagination.js';
import productModal from './productModal.js';
import delProductModal from './delProductModal.js';

const url ='https://vue3-course-api.hexschool.io/v2';
const path ='caiji-hexschool';




const app = createApp({
    data(){
        return{
            temp:{
                category:'',
                imagesUrl:[]
            },
            products:[],
            isNew:true,
            pagination:{}
        }
    },
    mounted(){
       
        this.checkLogin();
        // const modal = document.querySelector('#productModal');
    //    myModal = new bootstrap.Modal(document.querySelector('#productModal'));
        // delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
    },
    watch:{
        radioCategory(current){
            if(this.radioCategory==='new' || this.radioCategory==='odd'){
                this.temp.category='';
            }
        }
    },
    methods:{
        checkLogin(){
            const Token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = Token;

            axios.post(`${url}/api/user/check`)
            .then((res) =>{
                console.log(res);
                this.getProducts();
            })
            .catch((err) => {
                console.log(err);
                alert('驗證錯誤，請重新登入')
                window.location='./index.html';
            })
        },
        getProducts(page=1){
            axios.get(`${url}/api/${path}/admin/products?page=${page}`)
            .then((res) => {
                console.log(res);
                this.products = res.data.products;
                console.log(res.data.pagination);
                this.pagination = res.data.pagination;
                this.$refs.myModal.hideModal();
            })
            .catch((err) => {
                console.log(err);
            })
        },
        productsModal(status,product){
            
            if(status==='isNew'){
                console.log(this.isNew);
                this.temp={
                    category:'',
                    imagesUrl:[]
                };
                this.isNew = true;
                this.$refs.myModal.openModal();
            }else if(status==='edit'){
                //↓ 因物件傳參考 編輯時立即影響畫面內容
                // this.temp=product;
                //因畫面(產品列表)沒有圖片 所以可以淺層拷貝就好
                // this.temp = {...product};
                //深層拷貝↓
                this.temp = JSON.parse(JSON.stringify(product));
                if(this.temp.imagesUrl){
                    this.isNew = false;
                    this.$refs.myModal.openModal();
                }else{
                    this.temp.imagesUrl=[];
                    this.isNew = false;
                    this.$refs.myModal.openModal();
                }
            }else if(status==='del'){
               
                // this.temp = {...product};
                this.temp = JSON.parse(JSON.stringify(product));
                this.$refs.delModal.openModal();
                // delProductModal.show();
            }   
        }
        
    },
    
    components:{
        pagination,productModal,delProductModal
    }
       
})


app.mount('#app');