import { Query } from 'react-apollo';
import { QUERY_SIGNEDIN_USER } from './User';
import Signin from './Signin';

const Restriction = props => (
    <Query query={ QUERY_SIGNEDIN_USER }>
        { ( { data, loading } ) => {
            if( loading ) return <p>Loading...</p>
            if( !data.signedinuser ) {
                return <div>
                    <p>
                        Sorry Buckaroo, you can't do that! Sign in, then you probaly can.
                    </p>
                    <Signin />
                </div>
            };
            return props.children;
        }}

    </Query>
)

export default Restriction;