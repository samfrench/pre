<?php

class DataController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function indexAction()
    {
        // action body
    }

    public function conceptsAction()
    {
        $sourceUrl = 'http://juicer.responsivenews.co.uk/articles/' . $this->getParam('id') . '.json';
        $client = new Zend_Http_Client($sourceUrl); 
        $response = $client->request();
        $json = json_decode($response->getBody());

        $concepts = array();

        if (!isset($json->article)) {
            return json_encode('');
        }

        if ($json->article && $json->article->places) {
            foreach ($json->article->places as $place) {
                $concepts[] = $place->dbpedia_url;
            }
        }

        if ($json->article && $json->article->people) {
            foreach ($json->article->people as $person) {
                $concepts[] = $person->dbpedia_url;
            }
        }

        if ($json->article && $json->article->organisations) {
            foreach ($json->article->organisations as $organisation) {
                $concepts[] = $organisation->dbpedia_url;
            }
        }

        echo json_encode($concepts);
    }


}

