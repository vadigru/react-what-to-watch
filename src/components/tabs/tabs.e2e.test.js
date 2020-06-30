import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "../tabs/tabs.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  activeTab: `Drama`,
  tabNames: [`Drama`, `Adventure`, `Crime`],
};

const preventEvent = {
  preventDefault() {}
};

it(`Should tab be clicked`, () => {
  const onTabClick = jest.fn();

  const tabs = shallow(
      <Tabs {...mock} onTabClick={onTabClick}/>
  );

  const tabNames = tabs.find(`.catalog__genres-link`);

  tabNames.forEach((tab) => tab.simulate(`click`, preventEvent));
  expect(onTabClick).toHaveBeenCalledTimes(tabNames.length);
  expect(onTabClick).toHaveBeenCalledWith(mock.tabNames[0]);
  expect(onTabClick).toHaveBeenCalledWith(mock.tabNames[1]);
  expect(onTabClick).toHaveBeenCalledWith(mock.tabNames[2]);
});

