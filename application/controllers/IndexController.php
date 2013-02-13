<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $this->view->mainContent = $this->_helper->scrape(null, '#index-panels');
    }

    public function preAction()
    {
    	echo 'pre';
    }

    public function mostReadAction()
    {

    }

    public function newsAction()
    {
        
    }

    public function storyAction()
    {
        if ($this->getRequest()->getParam('story') === 'pre') {
            $this->_forward('pre');
        } elseif ($this->getRequest()->getParam('story') === 'article') {
            $this->_forward('index');
        } else {
            $this->view->storyId = $this->getRequest()->getParam('story');

            $this->view->storyBody = $this->_helper->scrape($this->view->storyId, '#page');
        }
    }


}

