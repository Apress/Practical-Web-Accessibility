(function() {
    Modal = {
        init: function() {
            'use strict';
            if ($('.modal').length) {
                let trigger,
                    modalFocusElements,
                    firstModalFocus,
                    lastModalFocus;

                Modal.initModalOpenOnClick();
                Modal.initModalClose();
                Modal.initModalCloseWithNavMask();
                Modal.initHandleModalKeyPress();
            }
        },

        openModal: function(target, button) {
            // Open the modal
            const $modal = $(target);
            $modal.addClass('modal-open');
            $modal.attr('aria-hidden', false);
            $('main').attr('aria-hidden', true);

            // Store the button that opened the modal
            trigger = button;

            modalFocusElements = $modal.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')
            firstModalFocus = modalFocusElements[0];
            lastModalFocus = modalFocusElements[modalFocusElements.length - 1];

            // Assign focus to the last button in the modal
            $(firstModalFocus).focus();
        },

        initModalOpenOnClick: function() {
            $('.js-modal-open').on('click', function(e) {
                e.preventDefault();
                const $this = $(this),
                      target = $this.data('target');
                Modal.openModal('#' + target, $(this));
            });
        },

        initModalClose: function() {
            $('.js-modal-close').on('click', function(e) {
                Modal.closeModal(e);
            });
        },

        initHandleModalKeyPress: function() {
            // The key codes that represent the tab and escape keys
            // To see key codes, check http://keycode.info/
            const esc = 27,
                  tab = 9;

            // Check for keyboard input
            // If its the escape key, close the modal
            // If it's a tab or back-tab handle the movement
            // We use keydown here to prevent skipping over the first or last focusable elements
            $(window).on('keydown', function(e) {
                if ($('.modal-open').length) {
                    switch(e.keyCode) {
                        case tab:
                            if (modalFocusElements.length === 1) {
                                e.preventDefault();
                                break;
                            }
                            if (e.shiftKey) {
                                Modal.handleBackTab(e);
                            } else {
                                Modal.handleTab(e);
                            }
                            break;
                        case esc:
                            if ($('.modal.modal-open').length > 0) {
                                Modal.closeModal(e);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        },

        initModalCloseWithNavMask: function() {
            // Allow for the modal to be closed by clicking outside of the content,
            // but don't close if a click occurs inside of the content
            $('.modal').on('click', function() {
                Modal.closeModal();
            });

            $('.modal > div').on('click', function(e) {
                e.stopPropagation();
            });
        },

        closeModal: function(e) {
            // Close the modal
            e ? e.preventDefault() : null;
            const $modal = $('.modal.modal-open');
            $modal.removeClass('modal-open');
            $modal.attr('aria-hidden', true);
            $('main').attr('aria-hidden', false);

            // Return focus to the original button that was clicked
            trigger.focus();
        },

        handleTab: function(e) {
            // If someone is on the last focusable element in the modal and is hitting tab,
            // Shift the focus to the first focusable element in the modal
            if (document.activeElement.isEqualNode(lastModalFocus)) {
                e.preventDefault();
                $(firstModalFocus).focus();
            }
        },

        handleBackTab: function(e) {
            // If someone is on the first focusable element in the modal and is hitting shift and tab to shift backwards,
            // Shift the focus to the last focusable element in the modal
            if(document.activeElement.isEqualNode(firstModalFocus)) {
                e.preventDefault();
                $(lastModalFocus).focus();
            }
        }
    }
})(window);

$(window.Modal.init);
