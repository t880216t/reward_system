/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Table, Divider, Popconfirm,Card,Form,Modal,Statistic,Button,Select,InputNumber,
  Badge,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd,handleEdit, handleModalVisible,record,playerList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if(record.account){
        handleEdit(fieldsValue)
      }else {
        handleAdd(fieldsValue);
      }
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新增玩家数据"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账号">
        {form.getFieldDecorator('account', {
          // rules: [{ required: true, message: '请输入账号名！'}],
          initialValue:record.player_id||undefined,
        })(
          <Select
            disabled={record.account?true:false}
            showSearch
            size="small"
            style={{ width: 200 }}
            placeholder="请选择玩家"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {playerList.map((item)=>(
              <Option key={item.id} value={item.id}>{`${item.account}--[${item.name}]`}</Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="额外奖励">
        {form.getFieldDecorator('bonus', {
          rules: [{ required: true, message: '请输入奖励额！'}],
          initialValue:record.bonus||0,
        })(<InputNumber style={{ width: 200 }} size="small" min={0} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="签约奖励">
        {form.getFieldDecorator('sign', {
          rules: [{ required: true, message: '请输入奖励额！'}],
          initialValue:record.sign||0,
        })(<InputNumber style={{ width: 200 }} size="small" min={0} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="BUG奖励(*0.3)">
        {form.getFieldDecorator('bug', {
          rules: [{ required: true, message: '请输入奖励额！'}],
          initialValue:record.bug||0,
        })(<InputNumber style={{ width: 200 }} size="small" min={0} />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ leyacg }) => ({
  leyacg,
}))
class Index extends Component{
  state={
    record:{},
    rewardList:[],
    playerList:[],
    lastReset:"",
  }

  componentWillMount(){
    this.queryRewardList()
    this.queryPlayerList()
  }

  queryRewardList=()=>{
    this.props.dispatch({
      type:"leyacg/queryRewardList",
    })
      .then(()=>{
        const {rewardList,lastReset} = this.props.leyacg;
        this.setState({rewardList,lastReset})
      })
  };

  queryPlayerList=()=>{
    this.props.dispatch({
      type:'leyacg/queryPlayerList',
      payload:{},
    })
      .then(()=>{
        const {playerList} = this.props.leyacg;
        this.setState({playerList})
      })
  };

  handleReset=()=>{
    this.props.dispatch({
      type:'leyacg/queryResetReward',
    })
      .then(()=>{
        this.queryRewardList()
      })
  };

  handleSendAll=()=>{
    this.props.dispatch({
      type:'leyacg/querySendAllReward'
    })
      .then(()=>{
        this.queryRewardList()
      })
  }

  handleShowAdd=()=>{
    this.setState({modalVisible:true})
  }

  handleModalVisible=()=>{
    this.setState({modalVisible:false,record:{}})
  }

  handleAdd=(fildes)=>{
    if(fildes.account){
      this.props.dispatch({
        type:'leyacg/queryAddReward',
        payload:fildes,
      })
        .then(()=>{
          this.queryRewardList()
          this.handleModalVisible()
        })
    }
  };

  querySendReward=(id)=>{
    this.props.dispatch({
      type:'leyacg/querySendReward',
      payload:{
        id
      }
    })
      .then(()=>{
        this.queryRewardList()
      })
  };

  handleEdit=(fildes)=>{
    const {id} =this.state.record;
    fildes.id = id;
    this.props.dispatch({
      type:'leyacg/queryEditReward',
      payload:fildes,
    })
      .then(()=>{
        this.queryRewardList()
        this.handleModalVisible()
      })
  };

  handleDelete=(id)=>{
    this.props.dispatch({
      type:'leyacg/queryDeleteReward',
      payload:{
        id,
      },
    })
      .then(()=>{
        this.queryRewardList()
      })
  };


  handleShowEdit=(record)=>{
    this.setState({
      record,
      modalVisible:true,
    })
  }

  render(){
    const {modalVisible,record,playerList,rewardList,lastReset} = this.state;
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text,record) => (
        <span>{record.index}</span>
      ),
    }, {
      title: '用户信息',
      dataIndex: 'name',
      key: 'name',
      render: (text,record) => (
        <div className={styles.colum_container}>
          <span>账号：<span className={styles.account}>{record.account}</span></span>
          <span>角色：<span className={styles.name}>{record.name}</span></span>
        </div>
      ),
    },{
      title: '发放状态',
      key: 'status',
      dataIndex: 'status',
      render: (text,record) => (
        <div>
          {record.status===1?
            <Badge status="default" text="已发放" />
            :
            <Badge status="processing" text="未发放" />
          }
        </div>
      ),
    }, {
      title: '应奖励资金',
      key: 'give',
      dataIndex: 'give',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.give - b.give,
      render: (text,record) => (
        <div>
          {record.status===1?
            <Statistic value={record.give} style={{color:'#95a5a6'}} />
            :
            <Statistic value={record.give} style={{color:'#44bd32'}} />
          }
        </div>
      ),
    }, {
      title: '本周积分明细',
      dataIndex: 'detail',
      key: 'detail',
      render: (text,record) => (
        <div className={styles.colum_container}>
          <span>额外积分：<span className={styles.name}>{record.bonus}</span></span>
          <span>签约积分：<span className={styles.name}>{record.sign}</span></span>
          <span>bug积分：<span className={styles.name}>{(record.bug*0.3).toFixed(1)}</span></span>
          <span>上周结余：<span className={styles.name}>{record.last_week}</span></span>
        </div>
      ),
    },{
      title: '总奖励积分',
      key: 'total',
      dataIndex: 'total',
      render: (text,record) => (
        <span className={styles.total}>{record.total}</span>
      ),
    },{
      title: '更新时间',
      key: 'update_time',
      dataIndex: 'update_time',
      width:'10%'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {record.status===0&&(
            <Popconfirm
              title="确认已发放这条奖励?"
              onConfirm={()=>this.querySendReward(record.id)}
            >
              <a>发放</a>
            </Popconfirm>
          )}
          {record.status===0&&(<Divider type="vertical" />)}
          {record.status===0&&(<a onClick={()=>this.handleShowEdit(record)}>编辑</a>)}
          {record.status===0&&(<Divider type="vertical" />)}
          <Popconfirm
            title="确认删除这条奖励?"
            onConfirm={()=>this.handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };

    return(
      <Card className={styles.container}>
        <div className={styles.addbutton}>
          <div style={{flex:1}}>
            <Button icon="dollar" type="primary" onClick={()=>this.handleShowAdd()}>新增奖励</Button>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:'flex-end',marginRight:30}}>
            <div>
              <Popconfirm
                title="确定已经发放所有奖励?"
                onConfirm={()=>this.handleSendAll()}
              >
                <Button icon="swap" style={{backgroundColor:'#f9ca24',borderColor:'#f9ca24',width:120,marginRight:10}} type="primary">一键发放</Button>
              </Popconfirm>
              <Button icon="reload" style={{backgroundColor:'#d63031',borderColor:'#d63031',width:120}} type="primary" onClick={()=>this.handleReset()}>重置本周</Button>
            </div>
            <div style={{fontSize:14,marginTop:5}}>最近重置：{lastReset}</div>
          </div>
        </div>
        <Table columns={columns} dataSource={rewardList} pagination={false} />
        <CreateForm {...parentMethods} modalVisible={modalVisible} record={record} playerList={playerList} />
      </Card>
    )
  }
}
export default Index;
