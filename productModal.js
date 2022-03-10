let myModal = '';
export default {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'caiji-hexschool',
      myModal: '',
      radioCategory:'odd',
    }
  },
  props: ['temp','isNew','products'],
  template: ` 
  <div id="productModal"  class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="temp.imageUrl">
              </div>
              <img class="img-fluid" :src="temp.imageUrl" alt="">
            </div>
            <!-- 多圖 -->
            <div class="mb-3">
              <div v-if="Array.isArray(temp.imagesUrl)">
                <template v-for="(image,key) in temp.imagesUrl" :key="key">
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="temp.imagesUrl[key]">
                  <img class="mb-3" :src="temp.imagesUrl[key]" alt="">
                </template>
                <button v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length-1]"
                  class="btn btn-outline-primary btn-sm d-block w-100" @click="temp.imagesUrl.push('')">
                  新增圖片
                </button>
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="temp.imagesUrl.pop()">
                  刪除圖片
                </button>
              </div>

            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model.trim="temp.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label me-3">分類</label>
                <input type="radio" name="category" id="oddCategory" value="odd" v-model="radioCategory">
                <label for="oddCategory" class="me-2">現有分類</label>
                <input type="radio" name="category" id="newCategory" value="new" v-model="radioCategory">
                <label for="newCategory">增加分類</label>
                <select v-if="radioCategory==='odd'" name="category" id="category" v-model="temp.category"
                  class="form-control">
                  <option value="" disabled>請選擇分類</option>
                  <option :value="item" v-for="item in setCategory">{{ item }}</option>
                </select>
                <input v-else id="category" type="text" class="form-control" placeholder="請輸入分類"
                  v-model.trim="temp.category">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model.trim="temp.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                  v-model="temp.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                  v-model="temp.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" class="form-control" placeholder="請輸入產品描述" v-model="temp.description">
                </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" class="form-control" placeholder="請輸入說明內容" v-model="temp.content">
                </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox" v-model="temp.is_enabled"
                  :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
  </div>
  </div>`,
  methods: {
    updateProduct() {
      let site = `${this.url}/api/${this.path}/admin/product`;
      let method = 'post';
      let errText = '新增失敗';
      if (!this.isNew) {
        site = `${this.url}/api/${this.path}/admin/product/${this.temp.id}`;
        method = 'put';
        errText = '編輯失敗';
      }

      axios[method](site, { data: this.temp })
        .then((res) => {
          console.log(res);
          // myModal.hide();
          this.hideModal();
          // this.temp = {
          //   category: '',
          //   imagesUrl: []
          // };
          // this.radioCategory = 'odd';
          this.$emit('get-products');
          // this.getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert(errText);
        })
    },
    openModal() {
      this.myModal.show();
    },
    hideModal() {
      this.myModal.hide();
    }
  },
  mounted() {
    this.myModal = new bootstrap.Modal(document.querySelector('#productModal'));
  
  },
  computed:{
    setCategory(){
        const categoryArray=Object.values(this.products);
        // categoryArray.forEach((item) => {
        //     console.log(item.category);
        // })
        let newCategoryArray={};
        newCategoryArray= new Set(categoryArray.map(item => item.category));
        // console.log(newCategoryArray);
        return newCategoryArray;
    }
  }

}