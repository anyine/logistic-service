import React from 'react';
import { NavBar, Icon, Card, WingBlank, WhiteSpace, List, Toast } from 'antd-mobile';
import '../index.less';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
const Item = List.Item;
const Brief = Item.Brief;

const getHealthUrl = restUrl.ADDR + 'health/getHealthList';

class healthLife extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          data: []
        };
    }
  
    componentDidMount() {
      this.getList();
    }

    getList = () => {
      Toast.loading('正在加载...', 0);
      ajax.getJSON(getHealthUrl, null, _data => {
        if(_data.success){
          let backData = _data.backData;
          let data = [];
          backData.map(item => {
            item.create_time = item.create_time.substring(0, 10);
            if(item.companyId === this.props.params.id){
              data.push(item);
            }
          });
          this.setState({
            data
          });
        }
        Toast.hide();
      });
    }

    //返回
    callback = () => {
      this.context.router.goBack();
    } 

    goTo = (path) => {
      this.context.router.push(path);
    }

    render() {
      const { data } = this.state;
        return (
          <div className="healthFood">
            <NavBar
              mode="light"
              icon={<Icon type="left" />}
              leftContent="返回" 
              onLeftClick={this.callback}
            >健康生活</NavBar>
            <div className='zui-content index zui-scroll-wrapper'>
              <div className="zui-scroll">
                <List>
                {
                  data.map(item => {
                    return (
                      <Item
                        key={item.id}
                        thumb={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}
                        onClick={() => {this.goTo('/pub/healthFood/detail/' + item.id)}}
                      >{item.health_title}<Brief>{item.health_desc}</Brief><Brief>发布日期：{item.create_time}</Brief>
                      </Item>
                    )
                  })
                }
                </List>
              </div>   
            </div>
          </div>
        );
    }
}

healthLife.contextTypes = {  
    router: React.PropTypes.object  
} 

export default  healthLife;
