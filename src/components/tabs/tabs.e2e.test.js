import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "../tabs/tabs.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  activeTab: `Overview`,
  tabNames: [`Overview`, `Details`, `Reviews`],
};

const preventEvent = {
  preventDefault() {}
};

it(`Should tab be clicked`, () => {
  const handleTabClick = jest.fn();

  const tabs = shallow(
      <Tabs
        tabNames={mock.tabNames}
        activeTab={mock.activeTab}
        onTabClick={handleTabClick}
      />
  );

  const tabItems = tabs.find(`.movie-nav__item`).at(2);

  tabItems.simulate(`click`, preventEvent);
  expect(handleTabClick).toHaveBeenCalledTimes(mock.tabNames.length);
  expect(handleTabClick).toHaveBeenCalledWith(mock.tabNames[2]);
});
