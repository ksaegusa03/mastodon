import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoadingIndicator from '../../components/loading_indicator';
import { fetchReblogs } from '../../actions/interactions';
import { ScrollContainer } from 'react-router-scroll';
import AccountContainer from '../../containers/account_container';
import Column from '../ui/components/column';
import ColumnBackButton from '../../components/column_back_button';

const mapStateToProps = (state, props) => ({
  accountIds: state.getIn(['user_lists', 'reblogged_by', Number(props.params.statusId)])
});

class Reblogs extends React.PureComponent {

  componentWillMount () {
    this.props.dispatch(fetchReblogs(Number(this.props.params.statusId)));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.statusId !== this.props.params.statusId && nextProps.params.statusId) {
      this.props.dispatch(fetchReblogs(Number(nextProps.params.statusId)));
    }
  }

  render () {
    const { accountIds } = this.props;

    if (!accountIds) {
      return (
        <Column>
          <LoadingIndicator />
        </Column>
      );
    }

    return (
      <Column>
        <ColumnBackButton />

        <ScrollContainer scrollKey='reblogs'>
          <div className='scrollable reblogs'>
            {accountIds.map(id => <AccountContainer key={id} id={id} withNote={false} />)}
          </div>
        </ScrollContainer>
      </Column>
    );
  }

}

Reblogs.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  accountIds: ImmutablePropTypes.list
};

export default connect(mapStateToProps)(Reblogs);
