import { mapWardrobeToUnleashedItems } from '@/utils/mapping/wardrobeMapper';

// Mock frame, panel, and door configs
debugger;
jest.mock('@/data/frame-config.json', () => [
  {
    mswColour: 'Bright White',
    mswFrameworkType: 'Steel S200',
    unleashedFrameworkType: 'S200',
    unleashedColour: 'WHITE',
    unleashedTrackPackCode: 'DRS-S2-TP'
  }
]);

jest.mock('@/data/panel-config.json', () => [
  {
    mswPanel: 'Mirror',
    priceBand: 'A',
    unleashedPanelName: 'MIRROR'
  }
]);

jest.mock('@/data/door-config.json', () => [
  { mswDoorType: 'Boston', code: 'DRS-ST-DES-EQ2' },
  { mswDoorType: 'Denver', code: '' }
]);

describe('mapWardrobeToUnleashedItems', () => {
  it('generates a standard track and groups doors by panel', () => {
    const wardrobe = {
      dims: {
        frameworkColour: 'Bright White',
        frameworkType: 'Steel S200',
        doorWidth: 800,
        slidingOpeningWidth: 2400,
        slidingOpeningHeight: 2300,
        trackLength: 3000,
        frontDoorType: 'Denver',
        rearDoorType: 'Denver'
      },
      doorDetails: [
        { doorNumber: 'Door 1', doorPanel: 'Mirror (Mirror)', softClose: 'Left' },
        { doorNumber: 'Door 2', doorPanel: 'Mirror (Mirror)', softClose: 'Right' },
        { doorNumber: 'Door 3', doorPanel: 'Mirror (Mirror)', softClose: 'None' }
      ],
      accessories: [
        { componentName: 'Soft Close Device & Adapter Plates', quantity: 2, netCost: '0' }
      ]
    };

    const items = mapWardrobeToUnleashedItems(wardrobe as any);

    expect(items).toEqual([
      {
        code: 'DRS-S200-A-1035', // 800 rounds to 1035
        qty: 3,
        comment: 'OA 2400MM / CH 2300MM / DW 800MM S200 WHITE MIRROR'
      },
      {
        code: 'DRS-S2-TP.3000',
        qty: 1,
        comment: ''
      },
      {
        code: 'DRS-Softclose',
        qty: 2,
        comment: 'Door 1 Left / Door 2 Right / Door 3 None'
      }
    ]);
  });

  it('adds cut-to-size when track length is non-standard', () => {
    const wardrobe = {
      dims: {
        frameworkColour: 'Bright White',
        frameworkType: 'Steel S200',
        doorWidth: 500,
        slidingOpeningWidth: 1500,
        slidingOpeningHeight: 2000,
        trackLength: 2500,
        frontDoorType: 'Denver',
        rearDoorType: 'Denver'
      },
      doorDetails: [
        { doorNumber: 'Door 1', doorPanel: 'Mirror', softClose: 'None' }
      ],
      accessories: []
    };

    const items = mapWardrobeToUnleashedItems(wardrobe as any);

    expect(items).toEqual([
      {
        code: 'DRS-S200-A-603', // 500 => 603
        qty: 1,
        comment: 'OA 1500MM / CH 2000MM / DW 500MM S200 WHITE MIRROR'
      },
      {
        code: 'DRS-S2-TP.3000', // nearest bracket above 2500 => 3000
        qty: 1,
        comment: ''
      },
      {
        code: '010-CUTTOSIZE',
        qty: 1,
        comment: 'Track Length 2500'
      }
    ]);
  });
});
