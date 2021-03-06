import React, { Component } from 'react'
import { Typography, Button, Row, Col, Spin, Space, Pagination, Result, Modal, AutoComplete, Input, Empty, Alert, Table } from 'antd';
import { FormOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { createClient } from '../Api/Api'
import ModifyPost from '../Admin/ModifyPost'
import Moment from 'react-moment';
import Manage from '../img/Manage.png'

const { Title } = Typography;

class Post extends Component {
  state = {
    error: null,
    isLoaded: false,
    post: [],
    size: 'large',
    currentPage: 1,
    postPerPage: 8,
    ModalText: 'êtes vous sur de vouloir suprimer cette article',
    visible: false,
    index: 0,
    isEditModal: true,
    confirmLoading: false,
    options: []
  }

  // requete de récupération des post
  async componentDidMount() {
    const result = await createClient.getPosts()
    if (result === 'error') {
      this.setState({ isLoaded: true, error: result });
    } else {
      this.setState({ isLoaded: true, post: result });
    }
  }

  // Modal de supression d'article et de modification
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  showModal = (index, typeModal) => {
    this.setState({
      visible: true,
      index: index,
      typeModal: typeModal
    });
  };

  async handleOk(id) {
    this.setState({
      ModalText: 'Votre articles est en train d\'etre suprimé',
      confirmLoading: true,
    });
    await createClient.deletePost(id)
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
    const result = await createClient.getPosts()
    if (result === 'error') {
      this.setState({ isLoaded: true, error: result });
    } else {
      this.setState({ isLoaded: true, post: result });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // recherche d'article via le champs de recherche
  getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
  }

  handleSearch = value => {
    this.setState({ options: value } ? this.searchResult(value) : []);
  };

  onSelect = value => {
    console.log('onSelect', value);
  };

  searchResult = query =>
    new Array(this.getRandomInt(5))
      .join('.')
      .split('.')
      .map((item, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
              <span>
                Found {query} on{' '}
                <a href={`https://s.taobao.com/search?q=${query}`} target="_blank" rel="noopener noreferrer">
                  {category}
                </a>
              </span>
              <span>{this.getRandomInt(200, 100)} results</span>
            </div>
          ),
        };
      });

  render() {
    const { error, isLoaded, post, size, currentPage, postPerPage, visible, index, typeModal, confirmLoading, ModalText, options } = this.state

    // on met en place la pagination
    const indexOfLastPage = currentPage * postPerPage
    const indexOfFirstPage = indexOfLastPage - postPerPage

    if (post) {
      const currentPost = post.slice(indexOfFirstPage, indexOfLastPage)

      //changer la page 
      const paginate = page => this.setState({ currentPage: page })

      // si il y'a une erreur coté serveur on affiche une 500
      if (error !== null) {
        return <Result status="500" title="500" subTitle="Désolé, nous n'avons pas réussi à chager la liste d'article."
          extra={
            <Button type="primary"><Link to={'/'}>Retour à l'accueil</Link></Button>
          } />
        // loadcircle le temps de chargement de la liste d'article
      } else if (!isLoaded) {
        return (
          <div>
            <br />
            <Space><Spin size="large" /></Space>
          </div>
        );
        // On affiche la liste d'article quand il y a du contenue  
      } else {
        // on définis les columns du tableau avec sa data
        const dataSource = currentPost
        console.log(index)
        const columns = [
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Accéder a l\'article',
            dataIndex: '',
            key: 'x',
            render: (record) => {
              return <Button type="primary" shape="round" size={size}>
                <Link to={'/PostDescription/' + record.slug}>Accéder à l'article</Link>
              </Button>
            }

          },
          {
            title: 'date',
            dataIndex: '',
            key: 'date',
            render: (record) =>
              <Moment>{record.date}</Moment>
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) =>
              <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={12}>
                    <Button type="primary" shape="round" size={size} danger onClick={() => this.showModal(index, false)}>
                      <DeleteOutlined />supprimer
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button style={{ backgroundColor: '#6ae184', color: 'white' }} shape="round" size={size} onClick={() => this.showModal(index, true)}>
                      <EditOutlined />Modifier
                    </Button>
                  </Col>
                </Row>
              </div>
          },
        ]
        return (
          <div className="site-layout-content">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={12}>
                <Title level={2}><img src={Manage} style={{width:'50px'}}/>Bienvenue sur la gestion de vos articles</Title>
              </Col>
              <Col className="gutter-row" span={4}>
                <AutoComplete dropdownMatchSelectWidth={252} style={{ width: 300, }} options={options} onSelect={this.onSelect} onSearch={this.handleSearch}>
                  <Input.Search size="large" placeholder="input here" enterButton />
                </AutoComplete>
              </Col>
              <Col className="gutter-row" span={8}>
                <Button type="primary" sucess shape="round" size={size}>
                  <Link to={'/AddPost'}><FormOutlined /> Créer un nouvel article</Link>
                </Button>
              </Col>
            </Row>
            <br />
            <br />
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            <Modal visible={visible} onOk={() => this.handleOk(dataSource[index].id)} confirmLoading={confirmLoading} cancelText='annuler' onCancel={() => this.handleCancel()}>
              {typeModal
                // contenue 2 de la modal
                ? <ModifyPost title={dataSource[index].title} description={dataSource[index].description} slug={dataSource[index].slug} content={dataSource[index].content} date={dataSource[index].date} />
                // contenue 1 de la modal
                : <p><ExclamationCircleOutlined size={size} />{ModalText}</p>
              }
            </Modal>
            <br />
            <br />
            <Pagination defaultCurrent={1} pageSize={postPerPage} total={post.length} onChange={paginate} />
          </div>
        );
      }
      // On affiche un message comme quoi il n'y a pas d'article et on met le bouton de création d'article
    } else {
      return (
        <div>
          <Alert message="Hello" description="il n'y a pas d'artilce ici." type="info" />
          <br />
          <br />
          <Empty description='' />
          <br />
          <br />
          <Button type="primary" sucess shape="round" size={size}>
            <Link to={'/AddPost'}><FormOutlined /> Créer un article</Link>
          </Button>
        </div>
      )
    }
  }
}


export default Post;