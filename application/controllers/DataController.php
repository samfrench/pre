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

    public function storiesAction()
    {
        $concepts = $this->getRequest()->getPost();
        $limit = 20;

        arsort($concepts);

        if (count($concepts) > $limit) {
            $filtered = array();
            foreach ($concepts as $key => $value) {
                if (count($filtered) >= $limit) {
                    break;
                }
                $filtered[$key] = $value;
            }
            $concepts = $filtered;
        }

        $articles = array();

        foreach ($concepts as $key => $value) {
            $key = str_replace('_', '.', $key);
            $sourceUrl = 'http://triplestore.responsivenews.co.uk/api/articles.json?binding=url&limit=1&where=%7B?url%20%3Chttp://data.press.net/ontology/tag/about%3E%20%3C' . $key . '%3E%20%20.%20%7D';
            
            $client = new Zend_Http_Client($sourceUrl);
            try {
                $response = $client->request();
                
                if (isset($response) && $response->isSuccessful()) {
                    $json = json_decode($response->getBody());
                    $article = $json->articles[0];
                    $newArticle = array();
                    $newArticle['cps_id'] = $article->cps_id;
                    $newArticle['description'] = $article->description;
                    // $bodytag = str_replace("%body%", "black", "<body text='%body%'>");
                    $url = $article->url;
                    $url = str_replace('http://www.bbc.co.uk', '', $url);
                    $url = str_replace('http://m.bbc.co.uk', '', $url);
                    $newArticle['url'] = $url;
                    $newArticle['title'] = $article->title;
                    $newArticle['published'] = $article->published;
                    $articles[] = $newArticle;
                }
            } catch (Exception $e) {

            }
        }
        echo json_encode($articles);
    }


}

