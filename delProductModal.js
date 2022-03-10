let delProductModal = '';

export default {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'caiji-hexschool',
      myModal: '',
      radioCategory: 'odd',
    }
  },
  props:['temp'],
  template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
  aria-labelledby="delProductModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ temp.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="delProductModall">
          確認刪除
        </button>
      </div>
    </div>
  </div>
</div>`,
  mounted(){
   
    this.delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
  },
  methods: {
    delProductModall() {
      
      axios.delete(`${this.url}/api/${this.path}/admin/product/${this.temp.id}`)
        .then((res) => {
          console.log(res);
          // this.getProducts();
         
          // delProductModal.hide();
          this.hideModal();
          this.$emit('get-products');
        })
        .catch((err) => {
          console.log(err);
          alert('刪除產品失敗');
        })
    },
    openModal(){
      this.delProductModal.show();
    },
    hideModal(){
      this.delProductModal.hide();
    },
    test(){
      console.log(12);
    }
  }
}