import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, AutoComplete } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class CustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.get('/address')
            .then(function (response) {
                response.data.map(function(province){
                    options.push({
                        value: province.name,
                        label: province.name,
                        children: province.city.map(function(city){
                            return {
                                value: city.name,
                                label: city.name,
                                children: city.area.map(function(area){
                                    return {
                                        value: area,
                                        label: area,
                                    };
                                })
                            };
                        }),
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
          <Modal
            visible={visible}
            title={title}
            okText={okText}
            onCancel={onCancel}
            onOk={onCreate}
          >
              <Form layout="horizontal">
                  <FormItem label="??????" {...FormItemLayout} hasFeedback>
                      {getFieldDecorator('name', {
                          rules: [{ required: true, message: '??????????????????' }],
                      })(
                        <Input />
                      )}
                  </FormItem>
                  {/*<FormItem label="??????" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('sex', {
                            rules: [{ required: true, message: '??????????????????' }],
                        })(
                            <Radio.Group style={{marginRight: 20}}>
                                <Radio value='???'>???</Radio>
                                <Radio value='???'>???</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>*/}
                  {/*<FormItem label="??????" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: '??????????????????' }],
                        })(
                            <InputNumber min={0} max={199} step={1} />
                        )}
                    </FormItem>*/}
                  <FormItem label="??????" {...FormItemLayout} hasFeedback>
                      {getFieldDecorator('address', {
                          rules: [{ required: true, message: '??????????????????' }],
                      })(
                        <Cascader options={options}/>
                      )}
                  </FormItem>
                  <FormItem label="????????????" {...FormItemLayout} hasFeedback>
                      {getFieldDecorator('detailAddress', {
                          rules: [{ required: true, message: '????????????????????????' }],
                      })(
                        <Input />
                      )}
                  </FormItem>
                  <FormItem label="?????????" {...FormItemLayout} hasFeedback>
                      {getFieldDecorator('phone', {
                          rules: [{
                              pattern: /^1([34578])\d{9}$/, message: '??????????????????????????????'
                          },{
                              required: true, message: '?????????????????????'
                          }],
                      })(
                        <Input addonBefore={'+86'} style={{ width: '100%' }} />
                      )}
                  </FormItem>
                  {/*<FormItem label="??????" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '????????????????????????',
                            }, {
                                required: true, message: '??????????????????',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>*/}
                  {/*<FormItem label="??????" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('website', {
                            rules: [{required: true, message: '??????????????????'}],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                            >
                                <Input/>
                            </AutoComplete>
                        )}
                    </FormItem>*/}
                  <FormItem label="????????????" {...FormItemLayout} hasFeedback>
                      {getFieldDecorator('postalcode', {
                          rules: [{ required: true, message: '????????????????????????' }],
                      })(
                        <Input />
                      )}
                  </FormItem>
                  <FormItem label="????????????" {...FormItemLayout} hasFeedback>
                      {getFieldDecorator('addressTag')(
                        <Input placeholder="??? ???,??????.???5?????????"/>
                      )}
                  </FormItem>
              </Form>
          </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;