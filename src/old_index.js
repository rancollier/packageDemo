import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_PRODUCT_BY_ID = gql`
query categoryList($id: Int! $search: String!) {
    category(id: $id) {
        id
        children {
            id
            name
            url_key
            url_path
            children_count
            path
            image
            productImagePreview: products(pageSize: 1) {
                items {
                    small_image {
                        url
                    }
                }
            }
        }
  },
  products(search:$search) {
    items {
      fashion_style
    }
  }
}

`;

const id = 1;
const search = 'skirt'

export const QueryDemo = () => {
    return (
        <Query 
        query={GET_PRODUCT_BY_ID} variables={{ id, search }}>
            {({ loading, error, data }) => {
                if (error) {
                    return (
                        <div>
                            Data Fetch Error: <pre>{error.message}</pre>
                        </div>
                    );
                }
                if (loading) {
                    return <div>loading...</div>;
                }
                if (data.products.items.length === 0) {
                    return (
                        <div >
                            No child categories found.
                        </div>
                    );
                }

                return (
                    <div>
                        {data.products.items.map((item, index)=> (
                           <div key={index}> {item.fashion_style} </div>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
};
