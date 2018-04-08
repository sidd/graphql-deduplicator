// @flow

/* eslint-disable id-match */

import test from 'ava';
import inflate from '../src/inflate';

test('inflates a deflated object', (t) => {
  const deflatedResponse = {
    data: [
      {
        __typename: 'foo',
        id: 1,
        name: 'bar',
        items: [[{
          __typename: 'item',
          id: 2,
          name: 'item1',
        }, {
          __typename: 'item',
          id: 3,
          name: 'item2',
        }]]
      },
      {
        __typename: 'foo',
        id: 2,
        name: 'dingo',
        items: [[{
          __typename: 'item',
          id: 2,
        }, {
          __typename: 'item',
          id: 3,
        }]]
      }
    ]
  };

  const inflatedResponse = inflate(deflatedResponse);
  console.log(inflatedResponse.data[0].items);

  t.deepEqual(inflatedResponse, {
    data: [
      {
        __typename: 'foo',
        id: 1,
        name: 'bar',
        items: [[{
          __typename: 'item',
          id: 2,
          name: 'item1',
        }, {
          __typename: 'item',
          id: 3,
          name: 'item2',
        }]],
      },
      {
        __typename: 'foo',
        id: 2,
        name: 'dingo',
        items: [[{
          __typename: 'item',
          id: 2,
          name: 'item1',
        }, {
          __typename: 'item',
          id: 3,
          name: 'item2',
        }]],
      }
    ]
  });
});

test('inflates a deflated object', (t) => {
  const deflatedResponse = {
    data: [
      {
        __typename: 'foo',
        id: 1,
        name: 'bar'
      },
      {
        __typename: 'foo',
        id: 1
      }
    ]
  };

  const inflatedResponse = inflate(deflatedResponse);

  t.deepEqual(inflatedResponse, {
    data: [
      {
        __typename: 'foo',
        id: 1,
        name: 'bar'
      },
      {
        __typename: 'foo',
        id: 1,
        name: 'bar'
      }
    ]
  });
});

test('inflates a deflated object (nested; different path)', (t) => {
  const deflatedResponse = {
    data: [
      {
        __typename: 'foo',
        bar1: {
          __typename: 'bar',
          id: 1,
          name: 'bar1'
        },
        bar2: {
          __typename: 'bar',
          id: 1,
          name: 'bar2'
        },
        id: 1
      },
      {
        __typename: 'foo',
        bar1: {
          __typename: 'bar',
          id: 1
        },
        bar2: {
          __typename: 'bar',
          id: 1
        },
        id: 2
      }
    ]
  };

  const inflatedResponse = inflate(deflatedResponse);

  t.deepEqual(inflatedResponse, {
    data: [
      {
        __typename: 'foo',
        bar1: {
          __typename: 'bar',
          id: 1,
          name: 'bar1'
        },
        bar2: {
          __typename: 'bar',
          id: 1,
          name: 'bar2'
        },
        id: 1
      },
      {
        __typename: 'foo',
        bar1: {
          __typename: 'bar',
          id: 1,
          name: 'bar1'
        },
        bar2: {
          __typename: 'bar',
          id: 1,
          name: 'bar2'
        },
        id: 2
      }
    ]
  });
});
