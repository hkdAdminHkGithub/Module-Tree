<template>
  <div class="examples">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 col-12">
          <div class="example">
            <div class="example-description">
              <input type="text" placeholder="Lọc nhóm sản phẩm..." v-model="filter" class="form-control filter-field">
            <div class="mt-2">
              <button class="btn btn-success" @click="showModal()">new root</button>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button @click="checkAll()" type="button" class="btn btn-secondary">select all</button>
                <button @click="uncheckAll()" type="button" class="btn btn-secondary">unselect all</button>
                <button @click="removeAll()" type="button" class="btn btn-secondary">remove all</button>
              </div>
            </div>
            </div>
            <div class="mt-2">
              <tree
                :data="data"
                @node:dragging:finish="dragFinish"
                :options="opts"
                :filter="filter"
                ref="tree"
                class="tree--small"
              >
                <div slot-scope="{ node }" class="node-container">
                  <div class="node-text">{{ node.text }}</div>
                  <div class="node-controls">
                    <button class="btn btn-primary btn-sm" @click.stop="viewNode(node)">Xem</button>
                    <button class="btn btn-primary btn-sm" @click.stop="showModal(node)">Thêm</button>
                    <button class="btn btn-primary btn-sm" @click.stop="editingNode(node)">Sửa</button>
                    <button class="btn btn-primary btn-sm" @click.stop="removeNode(node)">Xóa</button>
                  </div>
                </div>
              </tree>
            </div>
          </div>
        </div>
        <div v-if="node.id" class="col-md-8 col-12 border-left">
          <template v-if="loadView">
            <div class="d-flex justify-content-center align-items-center">
              <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="head-detail">
              <h3 class="text-primary">
                {{ node.title }}
              </h3>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div>
      <!-- Modal -->
      <div class="modal d-block" v-if="modal" @click="modal = false" @keyup.esc="modal = false">
        <div class="modal-dialog fadeIn" role="document" @click.stop>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm phần tử mới <strong v-if="parent">{{ parent }}</strong></h5>
                <button type="button" class="close" @click="modal = false">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                  <input v-if="parent" type="text" @keypress.enter="addChildNode(nodeTemp)" class="form-control" placeholder="Nhập giá trị mới... Enter" v-model="newValue">
                  <input v-else type="text" @keypress.enter="addNode()" class="form-control" placeholder="Nhập giá trị mới... Enter" v-model="newValue">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="modal = false">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LiquorTree from 'liquor-tree'

export default {
  data() {
    return {
      data: this.$store.state.wrapMenu.data,
      filter: null,
      modal: false,
      loadView: true,
      opts: {
        dnd: true,
        checkbox: true,
      },
      newValue: null,
      node: {
        id: null,
        title: null
      },
      nodeTemp: null,
      parent: null,
    };
  },

  filters: {
    time(time) {
      return +time
    }
  },

  mounted() {
    this.$store.dispatch('wrapMenu/fetchAndUpdateJson')

    this.$refs.tree.$on('node:editing:start', (node) => {
      console.log(node)
      console.log('Start editing: ' + node.text)
    })

    this.$refs.tree.$on('node:editing:stop', (node, isTextChanged) => {
      console.log(node)
      console.log('Stop editing: ' + node.text + ', ' + isTextChanged)
      this.commitData(node)
    })
  },
  methods: {
    // handle all
    checkAll(){
      let selection = this.$refs.tree.findAll({ state: { disabled: false } })
      selection.check(true)
    },
    uncheckAll(){
      let selection = this.$refs.tree.findAll({ state: { disabled: false } })
      selection.uncheck(true)
    },
    removeAll(){
      let node = this.$refs.tree
      let selection = node.findAll({ state: { checked: true } })
      if(!selection) return;
      let checkAll = []
      selection.some( o => { checkAll.push(o.data.text) })
      if(confirm(`Xoá tất cả ${checkAll}`))
        selection.remove(true)
    },
    // .handle all
    commitData(node){
      let model = node.tree.model
      this.modal = false
      this.newValue = ''
      this.node.title = (this.node.id === node.id && this.node.title)
        ? node.data.text
        : this.node.title
      this.data = model
      return this.$store.dispatch('fetchAndUpdateJson', JSON.stringify(model))
    },

    viewNode(node){
      if(this.node && node.id === this.node.id) return;
      this.loadView = true
      setTimeout(() => {
        this.loadView = false
      }, 1000)
      return this.node = {
        title: node.data.text,
        id: node.id
      }
    }, // method: viewNode

    editingNode(node, e) {
      console.log('editingNode', node)
      node.startEditing()
    },

    removeNode(node) {
      if (confirm('Are you sure?')) {
        node.remove()
        this.commitData(node)
      }
    },

    addNode(){
      // validation
      if(this.newValue.replace(/\s+/g,'').length === 0) return
      // handle add
      let nodes = this.$refs;
      nodes.tree.prepend({id: Date.now(), text: this.newValue})
      this.commitData(nodes)
      return alert('Thêm thành công')
    },

    addChildNode(node){
      // validation
      if(this.newValue.replace(/\s+/g,'').length === 0) return
      // handle add
      if (node.enabled()) {
        node.prepend(this.newValue)
        this.commitData(node)
      }
      return alert('Thêm thành công')
    },

    showModal(node){
      if(node){
        this.parent = node.data.text
        this.nodeTemp = node;
      }else{
        this.parent = this.nodeTemp = null;
      }
      return this.modal = true
    },

    dragFinish(targetNode){
      this.commitData(targetNode)
    },

    initEventViewer(event) {
      const events = this.events
      debugger;
      return function(node, newNode) {
        let nodeText = '-'
        let targetNode = newNode && newNode.text ? newNode : node

        if (targetNode && targetNode.text) {
          nodeText = targetNode.text
        }

        events.push(
          Object.assign({},
            event, { time: new Date, nodeText, id: key++ }
          )
        )

        console.log(event, arguments)
      }
    }
  }
}
</script>
