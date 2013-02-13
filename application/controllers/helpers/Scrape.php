<?php
class Application_Controller_Helper_Scrape extends Zend_Controller_Action_Helper_Abstract
{
	public function direct($storyId, $selector)
	{
		$sourceUrl = 'http://m.bbc.co.uk/news' . ($storyId ? '/' . $storyId : '');
		
        $client = new Zend_Http_Client($sourceUrl);
        $client->setCookie('ckps_d', 'm');
        
        $response = $client->request();
        $story = $response->getBody();
        
        $dom = new Zend_Dom_Query($story);
        $nodes = $dom->query($selector);
        $domDocument = new DOMDocument('1.0', 'utf-8');
        
        foreach ($nodes as $node) {
        	$domDocument->appendChild($domDocument->importNode($node, true));
    	}
        return $domDocument->saveHTML();
	}
}