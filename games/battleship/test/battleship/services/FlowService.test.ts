import "../../entry";
import sinon = require("sinon");
import { FlowEvent } from "./../../../src/battleship/events/FlowEvent";
import { FlowService } from "./../../../src/battleship/services/FlowService";
import { EventDispatcher } from "@robotlegsjs/core";
import { PalidorEvent } from "@robotlegsjs/pixi-palidor/lib";
import { assert } from "chai";

describe("flowService", () => {
    let flowService: FlowService;

    beforeEach(() => {
        flowService = new FlowService();
        flowService.eventDispatcher = new EventDispatcher();
        let flowEvent = new FlowEvent(FlowEvent.SHOW_GAME_OVER_POPUP);
    });

    afterEach(() => {
        flowService = undefined;
    });
    context("views", () => {
        it("should dispatch the event SHOW_HOME_VIEW when the method setHomeView is invoked", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            flowService.setHomeView();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, FlowEvent.SHOW_HOME_VIEW);
        });
        it("should dispatch the event SHOW_GAME_VIEW when the method setGameView is invoked", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            flowService.setGameView();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, FlowEvent.SHOW_GAME_VIEW);
        });
    });
    context("floating views", () => {
        it("should dispatch the event SHOW_GAME_OVER_POPUP when the method showGameOverPopup is invoked", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            flowService.showGameOverPopup();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, FlowEvent.SHOW_GAME_OVER_POPUP);
        });
        it("should dispatch the event SHOW_YOU_WIN_POPUP when the method showYouWinPopup is invoked", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            flowService.showYouWinPopup();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, FlowEvent.SHOW_YOU_WIN_POPUP);
        });
        it("should dispatch the event SHOW_PAUSE_POPUP when the method showPausePopup is invoked", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            flowService.showPausePopup();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, FlowEvent.SHOW_PAUSE_POPUP);
        });
    });
    context("extras", () => {
        it("should dispatch the event REMOVE_LAST_FLOATING_VIEW_ADDED when the method closePopup is invoked", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            flowService.closePopup();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED);
        });
        it("DispatchEventWith", () => {
            let dispatcherSpy = sinon.spy(flowService.eventDispatcher, "dispatchEventWith");
            let type = "TestDispatchEventWith";
            flowService.dispatchEventWith(type);
            let event = dispatcherSpy.firstCall.args[0];

            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, type);
        });
    });
});
