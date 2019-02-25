/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Table, Divider, Popconfirm,Card,Form,Modal,Input,Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less'

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd,hanldeEdit, handleModalVisible,record } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if(record.account){
        hanldeEdit(fieldsValue)
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
          rules: [{ required: true, message: '请输入账号名！'}],
          initialValue:record.account,
        })(<Input placeholder="请输入账号名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('playerName', {
          rules: [{ required: true, message: '请输入角色名！'}],
          initialValue:record.name,
        })(<Input placeholder="请输入角色名" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ leyacg }) => ({
  leyacg,
}))
class Players extends Component{
  state={
    playerList:[],
    record:{},
  }

  componentWillMount(){
    this.queryPlayerList()
  }

  queryPlayerList=()=>{
    this.props.dispatch({
      type:'leyacg/queryPlayerList',
      payload:{},
    })
      .then(()=>{
        const {playerList} = this.props.leyacg;
        this.setState({playerList})
      })
  }

  handleShowAdd=()=>{
    this.setState({modalVisible:true})
  };

  handleAdd=(e)=>{
    this.props.dispatch({
      type:'leyacg/queryAddPlayer',
      payload:e,
    })
      .then(()=>{
        this.queryPlayerList()
        this.handleModalVisible()
      })
  };

  hanldeEdit=(e)=>{
    const {id} = this.state.record;
    e.id = id;
    this.props.dispatch({
      type:'leyacg/queryEditPlayer',
      payload:e,
    })
      .then(()=>{
        this.queryPlayerList()
        this.handleModalVisible()
      })
  };

  handleDelete=(id)=>{
    this.props.dispatch({
      type:'leyacg/queryDeletePlayer',
      payload:{
        id,
      },
    })
      .then(()=>{
        this.queryPlayerList()
      })
  };

  handleShowEdit=(record)=>{
    this.setState({
      record,
      modalVisible:true,
    })
  }

  handleModalVisible=()=>{
    this.setState({
      modalVisible:false,
      record:{},
    })
  };

  render(){
    const {playerList,modalVisible,record} = this.state;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      width:'20%',
    }, {
      title: '角色名',
      dataIndex: 'name',
      key: 'name',
      width:'30%',
    }, {
      title: '新增时间',
      dataIndex: 'add_time',
      key: 'add_time',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={()=>this.handleShowEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除该角色信息?"
            onConfirm={()=>this.handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const parentMethods = {
      handleAdd: this.handleAdd,
      hanldeEdit: this.hanldeEdit,
      handleModalVisible: this.handleModalVisible,
    };

    return(
      <Card>
        <div className={styles.addbutton}>
          <Button icon="plus" type="primary" onClick={()=>this.handleShowAdd()}>新增玩家</Button>
        </div>
        <Table columns={columns} dataSource={playerList} pagination={{pageSize: 20,position:"both",size:'small'}} />
        <CreateForm {...parentMethods} modalVisible={modalVisible} record={record} />
      </Card>
    )
  }
}
export default Players;
