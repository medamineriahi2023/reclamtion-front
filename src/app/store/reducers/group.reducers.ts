import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {getGroup, getGroups} from '../actions/group.actions';
import {Group} from "../../models/Group";

export interface GroupState {
  groups: Group[];
  currentGroup: Group;
}

export const initialState: GroupState = {
    groups: [],
    currentGroup: null
};

const _groupReducer = createReducer(
  initialState,
  on(getGroups, (state, { groups }) => {
    return  {
      ...state,
      groups: groups,
    }
  }),
  on(getGroup, (state, { group }) => {
    return  {
      ...state,
      currentGroup: group,
    }
  })
)

export function groupReducer(state, action) {
  return _groupReducer(state, action)
}

export const selectGroupState = createFeatureSelector<GroupState>('group')
export const selectGroups = createSelector(selectGroupState, state => state.groups)


