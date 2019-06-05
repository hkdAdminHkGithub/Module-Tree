<template>
  <div class="examples">
    <div class="example">
      <div class="example-description">
        <input type="text" placeholder="Lọc nhóm sản phẩm..." v-model="filter" class="form-control filter-field">
      <div class="mt-2">
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
              <a href="#" @click.stop="addChildNode(node)">Thêm</a>
              <a href="#" @click.stop="editNode(node)">Sửa</a>
              <a href="#" @click.stop="removeNode(node)">Xóa</a>
            </div>
          </div>
        </tree>
      </div>
    </div>
  </div>
</template>

<script>
import LiquorTree from 'liquor-tree'

export default {
  data() {
    return {
      data: this.$store.state.wrap.data,
      filter: null,
      opts: {
        checkbox: true,
        dnd: true,
      },
    };
  },

  filters: {
    time(time) {
      return +time
    }
  },

  mounted() {
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
    uncheckAll(){true
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
    // .handle
    commitData(node){
      let data = node.tree.model
      return this.$store.commit('wrap/loadChange', ['data', data])
    },

    editNode(node, e) {
      console.log('editNode', node)
      node.startEditing()
      this.commitData(node)
    },

    removeNode(node) {
      if (confirm('Are you sure?')) {
        node.remove()
        this.commitData(node)
      }
    },

    addChildNode(node) {
      console.log('addChildNode', node)
      if (node.enabled()) {
        node.prepend('New Node')
        this.commitData(node)
      }
      console.log('new nodes: ',node)
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
