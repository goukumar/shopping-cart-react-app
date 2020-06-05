
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import React, { Component } from 'react';

class CategoryComponent extends Component{
   componentDidMount = () =>{
    this.props.laodCategory();
   }
    
    render() {
        return (
            <section className="categories row">
            {
                this.props.categories.map((item)=> {
                
                    return (<div className="col" key={item._id}>
                    <NavLink to={'/category/'+item.category} key={item._id}>
                        <figure><img src={item.image} alt={item.category}/></figure>
                        <p>{item.description}</p>
                        </NavLink>
                    </div>)
                })
            }
                
            </section>            
        )
    }
        
}

const mapStateToProps = state => ({
 categories: state.productReducer.categories
})
const mapDispatchToProps = disptach => {
  return {
    laodCategory: () => disptach({
      type: 'LOAD_CATEGORIES_ASYNC'
    })
  }
}

const Category = connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
export default Category;