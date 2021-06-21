<?php
require("./fpdf182/fpdf.php");

DEBUG = TRUE;

class PDF extends FPDF{
    function __construct($orient, $unit, $size, $logo, $text){
        parent::__construct($orient, $unit, $size);
        $this->logo=$logo;
        $this->text=$text;
        $this->$or=$orient;
    }
    function Header(){
        $this->Image('./img/filigrana.png', 40, 65, 200, 200);
        if($this->$or=='P'){
            $w=$this->GetPageWidth();
            $this->Image($this->logo,10,6,33);
            $this->SetFont('Arial','I',10);
            $this->SetY(10);
            $this->Cell($w-70-10,0);
            $this->MultiCell(70,5,$this->text,0,'L',0);
            $this->Ln(1);
        }
        else{
            $w=$this->GetPageWidth();
            $this->Image($this->logo,10,6,33);
            $this->SetFont('Arial','I',6);
            $this->SetY(10);
            $this->Cell($w-70-10,0);
            $this->MultiCell(70,5,$this->text,0,'L',0);
            $this->Ln(1);
        }
    }
    function Footer(){
        $w=$this->GetPageWidth();
        $this->SetY(-15);
        $this->SetFont('Arial','I',10);
        $this->Cell(0,10,$this->PageNo().' di {nb}',0,0,'C');
        $this->SetX(150);
        $this->Image('./img/powered_by.png',$w-65,$this->GetY()-2,60);
    }
}

$intro = "Prova di scrittura\nTest di scrittura";

if(isset($_POST['report']) or DEBUG){
    $report = json_decode($_POST['report']);

    $pdf = new PDF('P', 'mm', 'A4', './img/logo.png',$intro);
    $pdf->AddPage();

    $data_struct = [];
    foreach($report as $idx){
        $qry = "SELECT text FROM gdpr_enc WHERE id=".$idx;
        $res=$mysqli->query($qry);
        $res=$res->fetch_array();
        array_push($data_struct, $res);
    }
    //ordina

    //print


}
?>