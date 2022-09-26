// pages/components/Select/Select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 搜索所使用的方法
    searchFunc:Function,
    // 外部组件或者页面获取数据的方法
    getSelectDataFunc:Function,
    // 样式
    inputStyle:String,
    selectStyle:String,

    // placeholder
    placeholder:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 下拉列表展示数据
    selectList:[],
    // 输入框中的字符串
    inputValue:'',
    // 输入框中字符串所匹配的ID 根据selectList 匹配
    inputId:'-1',
    // 下拉列表是否显示
    selectShow:false,
    // 样式
    inputClass:'',
    selectClass:'',
  },

  lifetimes:{
    // 请求初始数据
    attached:async function(){
      this.getData(
        this.data.inputValue,
        (res) => {
          this.setData({
            selectList:res
          })}
      )
    }
  },
  observers:{
    // 根据输入框中输入的数据更新下列表中的数据
    'inputValue':function(inputValue){
      this.getData(
        inputValue,
        (res) => {
          this.setData({
            selectList:res
          })}
      )
    },
    // 根据下拉列表的数据更新选择ID
    'selectList':function(selectList){
      console.log('selectList展示列表',selectList)
      let target = selectList.filter(item => {
        return item.Name == this.data.inputValue
      })
      if(target.length == 0){
        this.setData({
          inputId:-1
        })
      }else{
        this.setData({
          inputId:target[0].ID
        })
      }
    },
    // 返回给上层组建
    'inputValue,inputId':function(inputValue,inputId){
      this.backData(
        this.data.inputId,
        this.data.inputValue
      )
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 输入
     * @param {*} e 
     */
    inputFunc(e){
      let input = e.detail.value
      // console.log('input输入',input)
      this.setData({
        inputValue:input
      })
    },
    /**
     * 获取数据
     * @param {*} like 
     * @param {*} callback 
     */
    getData(like,callback){
      this.triggerEvent('searchFunc', {like:like,callback:callback})
    },
    /**
     * 返回上层数据
     * @param {*} id 
     * @param {*} name 
     */
    backData(id,name){
      this.triggerEvent('getSelectDataFunc', {id:id,name:name})
    },
    /**
     * 点击下拉框更新
     * @param {*} e 
     */
    selectListTap(e){
      let {id,name} = e.currentTarget.dataset
      console.log('点击选择项',id,name)
      this.setData({
        inputValue:name,
        inputId:id
      })
    },
    /**
     * 控制下拉框显示/隐藏
     */
    focusFunc(){
      this.setData({
        selectShow:true
      })
    },
    blurFunc(){
      this.setData({
        // selectShow:false
      })
    },
  }
})
