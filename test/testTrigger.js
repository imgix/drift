/* global describe it expect beforeEach afterEach */

import Trigger from "../src/js/Trigger";

import { mockEvent, triggerOptions } from "./helpers";

beforeEach(function() {
  const anchor = document.createElement("a");
  anchor.classList.add("test-anchor");
  anchor.setAttribute("href", "http://assets.imgix.net/test.png&w=400");
  anchor.dataset.zoom = "http://assets.imgix.net/test.png&w=1200";
  document.body.appendChild(anchor);
});

afterEach(function() {
  const anchor = document.querySelector(".test-anchor");

  document.body.removeChild(anchor);
});

describe("Trigger", () => {
  it("returns an instance of `Trigger` when correctly instantiated", () => {
    const trigger = new Trigger(triggerOptions());

    expect(trigger.constructor).toBe(Trigger);
  });

  it("requires `el` option", () => {
    const opts = triggerOptions();
    delete opts.el;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `zoomPane` option", () => {
    const opts = triggerOptions();
    delete opts.zoomPane;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `sourceAttribute` option", () => {
    const opts = triggerOptions();
    delete opts.sourceAttribute;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `handleTouch` option", () => {
    const opts = triggerOptions();
    delete opts.handleTouch;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("executes the `onShow` callback when present", () => {
    let called = false;
    // e
    function showCallback() {
      called = true;
    }
    const opts = triggerOptions();
    opts.onShow = showCallback;

    const trigger = new Trigger(opts);
    trigger._show(mockEvent);

    expect(called).toBe(true);
  });

  it("executes the `onHide` callback when present", () => {
    let called = false;
    function hideCallback() {
      called = true;
    }

    const opts = triggerOptions();
    opts.onHide = hideCallback;

    const trigger = new Trigger(opts);
    trigger._show(mockEvent);
    trigger._hide(mockEvent);

    expect(called).toBe(true);
  });
  it("does not execute mousedown on mobile when handleTouch is set to false", () => {
    const opts = triggerOptions();
    opts.handleTouch = false;
    const trigger = new Trigger(opts);
    const spy = spyOn(trigger, "_handleEntry");

    const event = new Event("touchstart");
    // Optionally: add `console.log(e + ' ' + e.detail)` to _handleEntry
    // and uncomment the next line
    // const event = new CustomEvent('mouseenter', { detail: "This should not show on touchstart" });

    trigger.settings.el.dispatchEvent(event);
    expect(trigger._handleEntry).not.toHaveBeenCalled();
  });
});
